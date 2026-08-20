import logging
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.db.supabase import supabase
from app.models.payment_methods import PaymentMethod

logger = logging.getLogger(__name__)


class PaymentMethodService:
    """Service layer for managing user payment methods."""

    def __init__(self) -> None:
        self.client = supabase
    
    def add(
        self, 
        db: Session, 
        user_id: str, 
        payment_method_name: str
    ) -> PaymentMethod:
        """Adds a new payment method to a user's profile.

        Args:
            db (Session): The SQLAlchemy database session.
            user_id (str): The unique identifier of the user.
            payment_method_name (str): The name or type of the payment method.
            
        Returns:
            PaymentMethod: The newly created payment method object.

        Raises:
            ValueError: If the payment method name already exists for this user.
        """
        new_payment_method = PaymentMethod(
            user_id=user_id,
            name=payment_method_name
        )
        
        db.add(new_payment_method)
        
        try:
            db.commit()
            db.refresh(new_payment_method)
            logger.info(f"Payment method '{payment_method_name}' added for user {user_id}.")
            return new_payment_method
        except IntegrityError:
            # Reverts the failed transaction to keep the session usable
            # Triggered by the unique constraint: payment_methods_user_id_name_key
            db.rollback()
            logger.warning(f"Failed to add payment method: '{payment_method_name}' already exists for user {user_id}.")
            raise ValueError(f"Payment method '{payment_method_name}' already exists for this user.")