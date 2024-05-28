from pydantic import BaseModel, EmailStr

class SIGNUPFORM(BaseModel):
    username: str
    email: EmailStr
    password: str