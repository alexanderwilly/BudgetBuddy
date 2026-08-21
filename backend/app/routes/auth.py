from fastapi import APIRouter, Depends, HTTPException, Response, status
from sqlalchemy.orm import Session

from app.db.supabase import get_supabase_client
from app.dependencies.auth import get_current_user, get_db
from supabase import Client
from app.models.user import User
from app.schemas.auth import LoginRequest
from app.schemas.user import UserResponse
from app.services.auth_service import AuthService

router = APIRouter()
auth_service = AuthService()


@router.post("/login", response_model=UserResponse)
def login(
    login_data: LoginRequest,
    response: Response,
    db: Session = Depends(get_db),
    supabase_client: Client = Depends(get_supabase_client),
):
    """
    Login endpoint to authenticate users with Supabase and set an HTTP-only JWT cookie.
    """
    try:
        access_token, user = auth_service.authenticate_user(
            login_data.email, login_data.password, db, supabase_client
        )

        # Set HTTP-only cookie
        response.set_cookie(
            key="access_token",
            value=access_token,
            httponly=True,
            secure=True,
            samesite="lax",
            # max_age=auth_response.session.expires_in
        )

        return user

    except Exception as e:
        print(e)
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)


@router.get("/me", response_model=UserResponse)
def get_me(current_user: User = Depends(get_current_user)):
    """
    Get the currently authenticated user based on the HTTP-only cookie.
    """
    return current_user


@router.post("/logout")
def logout(response: Response, supabase_client: Client = Depends(get_supabase_client)):
    """
    Logout the user by clearing the HTTP-only cookie and signing out of Supabase.
    """
    try:
        supabase_client.auth.sign_out()
    except Exception:
        pass

    response.delete_cookie(
        key="access_token", httponly=True, secure=True, samesite="lax"
    )
    return {"message": "Logged out successfully"}
