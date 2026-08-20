from sqlalchemy import Column, String, DateTime, ForeignKey, UniqueConstraint
from sqlalchemy.sql import func
import uuid
from app.db.database import Base

class PaymentMethod(Base):
    """Represents a user's payment method in the database.

    Attributes:
        id (str): Unique identifier for the payment method.
        user_id (str): The ID of the user who owns this payment method.
        name (str): The name or type of the payment method (e.g., 'Visa', 'PayPal').
        created_at (datetime): The timestamp when the record was created.
        updated_at (datetime): The timestamp when the record was last modified.
    """
    
    __tablename__ = "payment_methods"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    name = Column(String, nullable=False)
    created_at = Column(DateTime(timezone=True), nullable=False, server_default=func.now())
    updated_at = Column(DateTime(timezone=True), nullable=False, server_default=func.now(), onupdate=func.now())

    __table_args__ = (
        UniqueConstraint("user_id", "name", name="payment_methods_user_id_name_key"),
    )