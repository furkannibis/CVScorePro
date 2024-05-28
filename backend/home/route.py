from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse

from general.user import get_current_user

home_router = APIRouter()

@home_router.post("/home")
async def home_page(token: dict = Depends(get_current_user)):
    return JSONResponse(content=token)