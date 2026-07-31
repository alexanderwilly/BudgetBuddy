from sqlalchemy import Column, String, Boolean, DateTime
from sqlalchemy.sql import func
import uuid
from app.db.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    email = Column(String, unique=True, index=True, nullable=False)
    fullname = Column(String, nullable=False)
    master_currency = Column(String, nullable=False, default="USD")
    family_group_id = Column(String, nullable=True)
    family_role = Column(String, nullable=True)
    is_hidden_from_family = Column(Boolean, nullable=True, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
