from pydantic import BaseModel, EmailStr


class RegisterRequest(BaseModel):
    name: str
    email: EmailStr
    password: str


class RegisterResponse(BaseModel):
    user_id: int
    message: str


class LoginRequest(BaseModel):
    email: EmailStr
    password: str
