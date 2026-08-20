import uuid
from datetime import datetime
from pydantic import BaseModel, ConfigDict

class PaymentMethodBase(BaseModel):
    """Base schema for payment method."""
    name: str

class PaymentMethodCreate(PaymentMethodBase):
    """Schema for creating a new payment method."""
    pass

class PaymentMethodResponse(PaymentMethodBase):
    """Schema for payment method response."""
    id: uuid.UUID
    user_id: uuid.UUID
    created_at: datetime
    updated_at: datetime
    
    model_config = ConfigDict(from_attributes=True)
