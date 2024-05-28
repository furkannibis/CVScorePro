from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from login.route import login_route
from signup.route import signup_router
from home.route import home_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(login_route)
app.include_router(signup_router)
app.include_router(home_router)