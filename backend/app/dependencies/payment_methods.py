from app.services.payment_method_service import PaymentMethodService


def get_payment_method_service() -> PaymentMethodService:
    """Dependency to provide the PaymentMethodService.

    Returns:
        PaymentMethodService: An instance of the payment method service.
    """
    return PaymentMethodService()
