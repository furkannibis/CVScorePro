from fastapi import APIRouter, status, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.responses import JSONResponse

from typing import Annotated

from general.token import create_token, decode_token
from general.sql import get_conn
from general.encryption import hash_data

from login.sql import GET_USER



login_route = APIRouter()
@login_route.post("/login", status_code=status.HTTP_200_OK)
async def handle_login(form_data: Annotated[OAuth2PasswordRequestForm, Depends()]):
    conn = get_conn()
    curr = conn.cursor()
    curr.execute(GET_USER, (form_data.username, hash_data(form_data.password)))

    user = curr.fetchone()
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Unable to log in. Please verify your username and password.")
    
    token = create_token(username=user[2], password=user[3])
    return JSONResponse(
        content= {
            "token": token
        }
    )