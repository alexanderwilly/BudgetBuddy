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

    def add(self, db: Session, user_id: str, payment_method_name: str) -> PaymentMethod:
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
        new_payment_method = PaymentMethod(user_id=user_id, name=payment_method_name)

        db.add(new_payment_method)

        try:
            db.commit()
            db.refresh(new_payment_method)
            logger.info(
                f"Payment method '{payment_method_name}' added for user {user_id}."
            )
            return new_payment_method
        except IntegrityError:
            # Reverts the failed transaction to keep the session usable
            # Triggered by the unique constraint: payment_methods_user_id_name_key
            db.rollback()
            logger.warning(
                f"Failed to add payment method: '{payment_method_name}' already exists for user {user_id}."
            )
            raise ValueError(
                f"Payment method '{payment_method_name}' already exists for this user."
            )

    def get_all(self, db: Session, user_id: str) -> list[PaymentMethod]:
        """Retrieves all payment methods for a specific user.

        Args:
            db (Session): The SQLAlchemy database session.
            user_id (str): The unique identifier of the user.

        Returns:
            list[PaymentMethod]: A list of payment method objects belonging to the user.
        """
        payment_methods = (
            db.query(PaymentMethod).filter(PaymentMethod.user_id == user_id).all()
        )
        logger.info(
            f"Retrieved {len(payment_methods)} payment methods for user {user_id}."
        )
        return payment_methods

    def delete(self, db: Session, user_id: str, payment_method_id: str) -> None:
        """Deletes a specific payment method for a user.

        Args:
            db (Session): The SQLAlchemy database session.
            user_id (str): The unique identifier of the user.
            payment_method_id (str): The unique identifier of the payment method.

        Raises:
            ValueError: If the payment method does not exist or does not belong to the user.
        """
        payment_method = (
            db.query(PaymentMethod)
            .filter(
                PaymentMethod.id == payment_method_id, PaymentMethod.user_id == user_id
            )
            .first()
        )

        if not payment_method:
            logger.warning(
                f"Failed to delete payment method: {payment_method_id} not found for user {user_id}."
            )
            raise ValueError("Payment method not found or unauthorized.")

        db.delete(payment_method)
        db.commit()
        logger.info(f"Deleted payment method {payment_method_id} for user {user_id}.")
