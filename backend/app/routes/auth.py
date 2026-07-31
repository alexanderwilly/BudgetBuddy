from fastapi import APIRouter, HTTPException, status, Response, Depends
from sqlalchemy.orm import Session
from app.schemas.auth import LoginRequest
from app.schemas.user import UserResponse
from app.db.supabase import supabase
from app.dependencies.auth import get_db, get_current_user
from app.models.user import User

router = APIRouter()

@router.post("/login", response_model=UserResponse)
def login(login_data: LoginRequest, response: Response, db: Session = Depends(get_db)):
    """
    Login endpoint to authenticate users with Supabase and set an HTTP-only JWT cookie.
    """
    try:
        auth_response = supabase.auth.sign_in_with_password({
            "email": login_data.email,
            "password": login_data.password,
        })

        if not auth_response.session:
            raise HTTPException(status_code=401, detail="Invalid credentials")
            
        access_token = auth_response.session.access_token
        
        # Set HTTP-only cookie
        response.set_cookie(
            key="access_token",
            value=access_token,
            httponly=True,
            secure=True,
            samesite="lax",
            # max_age=auth_response.session.expires_in
        )
        
        user_id = auth_response.user.id
        
        # Fetch user metadata from database
        user = db.query(User).filter(User.id == user_id).first()
        if not user:
            raise HTTPException(status_code=404, detail="User profile not found")
        
        return user
        
    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, 
            detail=str(e)
        )

@router.get("/me", response_model=UserResponse)
def get_me(current_user: User = Depends(get_current_user)):
    """
    Get the currently authenticated user based on the HTTP-only cookie.
    """
    return current_user

@router.post("/logout")
def logout(response: Response):
    """
    Logout the user by clearing the HTTP-only cookie and signing out of Supabase.
    """
    try:
        supabase.auth.sign_out()
    except Exception:
        pass
        
    response.delete_cookie(
        key="access_token",
        httponly=True,
        secure=True,
        samesite="lax"
    )
    return {"message": "Logged out successfully"}