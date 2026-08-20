from sqlalchemy.orm import Session

from app.db.supabase import supabase
from app.models.user import User


class AuthService:
    def __init__(self):
        self.client = supabase

    def authenticate_user(self, email: str, password: str, db: Session):
        """Function to authenticate user"""
        auth_response = self.client.auth.sign_in_with_password(
            {
                "email": email,
                "password": password,
            }
        )

        if not auth_response.session:
            raise ValueError("Invalid credentials")

        access_token = auth_response.session.access_token
        user_id = auth_response.user.id

        # Fetch user metadata from database
        user = db.query(User).filter(User.id == user_id).first()
        if not user:
            raise ValueError("User profile not found")

        return access_token, user
