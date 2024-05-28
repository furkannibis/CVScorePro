from datetime import datetime, timedelta
import jwt

def create_token(username: str, password: str):
    expires = datetime.utcnow() + timedelta(minutes=30)
    expires_str = expires.strftime("%Y-%m-%dT%H:%M:%SZ")
    jwt_content = {
        "username": username,
        "password": password,
        "expires": expires_str
    }

    return jwt.encode(jwt_content, "furkansecretkey", algorithm="HS256")

def decode_token(token):
    return jwt.decode(token, "furkansecretkey", algorithms="HS256")