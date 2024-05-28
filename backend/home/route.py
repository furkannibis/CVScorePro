from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.responses import JSONResponse

from general.user import get_current_user
from general.token import decode_token

home_router = APIRouter()

@home_router.post("/home")
async def home_page(token: dict = Depends(get_current_user)):
    return JSONResponse(content={"username": token["username"]})