from fastapi import APIRouter, status, HTTPException
from fastapi.responses import JSONResponse

from general.sql import get_conn
from general.encryption import hash_data

from signup.const import SIGNUPFORM
from signup.sql import ADD_USER

signup_router = APIRouter()

@signup_router.post("/signup", status_code=status.HTTP_201_CREATED)
async def create_user(payload: SIGNUPFORM):
    conn = get_conn()
    curr = conn.cursor()
    try:
        curr.execute(ADD_USER, (payload.username, payload.email, hash_data(payload.password),))
        conn.commit()
    except Exception as err:
        print(err)
        return JSONResponse(content="Username or email already in use!", status_code=status.HTTP_400_BAD_REQUEST)
    finally:
        conn.close()

    return JSONResponse(content="Registration successful!")