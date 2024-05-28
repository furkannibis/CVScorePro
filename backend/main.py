from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from login.route import login_route
from home.route import home_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

app.include_router(login_route)
app.include_router(home_router)