from fastapi import APIRouter, HTTPException, status
from typing import Any, Dict

from app.schemas.auth import RegisterRequest, RegisterResponse, LoginRequest
from app.services import auth_service

router = APIRouter(prefix="/auth", tags=["Auth"])


def _normalize_email(email: str) -> str:
    return email.strip().lower()


# -------------------- #
# Register
# -------------------- #

@router.post("/auth/register", response_model=RegisterResponse)
def register(req: RegisterRequest):
    """
    Register endpoint.
    Accepts: name, email, password
    """

    name = req.name.strip()
    email = _normalize_email(req.email)

    try:
        # hash password
        password_hash = auth_service.hash_password(req.password)

        # register user (NO phone)
        user_id = auth_service.register_user(
            name=name,
            email=email,
            password_hash=password_hash
        )

    except ValueError as ve:
        # e.g. duplicate email
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=str(ve)
        )
    except Exception as exc:
        print("Unhandled error in register:", exc)
        raise HTTPException(
            status_code=500,
            detail="Internal server error"
        )

    return {
        "user_id": user_id,
        "message": "User registered successfully"
    }


# -------------------- #
# Login
# -------------------- #

@router.post("/auth/login")
def login(req: LoginRequest) -> Dict[str, Any]:
    """
    Login endpoint.
    """

    email = _normalize_email(req.email)

    try:
        result = auth_service.login_user(email, req.password)

    except Exception as exc:
        print("Login error:", exc)
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )

    # normalize response
    if isinstance(result, dict):
        return result

    if isinstance(result, str):
        return {"access_token": result}

    print("Unexpected login_user return:", result)
    raise HTTPException(
        status_code=500,
        detail="Login failed"
    )
