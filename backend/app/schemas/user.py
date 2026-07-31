from pydantic import BaseModel
from typing import Optional
from datetime import datetime
import uuid

class UserBase(BaseModel):
    email: str
    fullname: str
    master_currency: str = "USD"
    family_group_id: Optional[str] = None
    family_role: Optional[str] = None
    is_hidden_from_family: Optional[bool] = False

class UserResponse(UserBase):
    id: uuid.UUID
    created_at: datetime

    class Config:
        from_attributes = True
