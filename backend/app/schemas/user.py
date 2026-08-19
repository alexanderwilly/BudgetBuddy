import uuid
from datetime import datetime

from pydantic import BaseModel


class UserBase(BaseModel):
    email: str
    fullname: str
    master_currency: str = "USD"
    family_group_id: str | None = None
    family_role: str | None = None
    is_hidden_from_family: bool | None = False


class UserResponse(UserBase):
    id: uuid.UUID
    created_at: datetime

    class Config:
        from_attributes = True
