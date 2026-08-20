from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.dependencies.auth import get_current_user, get_db
from app.dependencies.payment_methods import get_payment_method_service
from app.models.user import User
from app.schemas.payment_method import PaymentMethodCreate, PaymentMethodResponse
from app.services.payment_method_service import PaymentMethodService

router = APIRouter()

@router.post("/add", response_model=PaymentMethodResponse, status_code=status.HTTP_201_CREATED)
def add_payment_method(
    payment_method_data: PaymentMethodCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
    payment_method_service: PaymentMethodService = Depends(get_payment_method_service)
):
    """Add a new payment method for the current user."""
    try:
        payment_method = payment_method_service.add(
            db=db,
            user_id=current_user.id,
            payment_method_name=payment_method_data.name
        )
        return payment_method
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )