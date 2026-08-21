import pytest
from unittest.mock import MagicMock
from sqlalchemy.exc import IntegrityError

from app.services.payment_method_service import PaymentMethodService
from app.models.payment_methods import PaymentMethod


@pytest.fixture
def service():
    return PaymentMethodService()


# ============
# 1. Add new payment method
# ============


def test_add_success(service, mock_db_session):
    """Test on adding new payment method to database"""
    result = service.add(
        mock_db_session, user_id="user_123", payment_method_name="Credit Card"
    )

    mock_db_session.add.assert_called_once()
    mock_db_session.commit.assert_called_once()
    assert result.name == "Credit Card"


def test_add_duplicate_raises_error(service, mock_db_session):
    """Test duplicates of payment methods"""
    mock_db_session.commit.side_effect = IntegrityError("statement", "params", "orig")

    with pytest.raises(ValueError, match="already exists"):
        service.add(
            mock_db_session, user_id="user_123", payment_method_name="Credit Card"
        )
    mock_db_session.rollback.assert_called_once()


# ============
# 2. Get all payment methods correspond to the user
# ============


def test_get_all(service, mock_db_session):
    """Test to get all payment methods"""
    mock_query = mock_db_session.query.return_value
    mock_filter = mock_query.filter.return_value
    mock_filter.all.return_value = [PaymentMethod(id="pm_1", name="PayPal")]

    results = service.get_all(mock_db_session, user_id="user_123")
    assert len(results) == 1
    assert results[0].name == "PayPal"


# ============
# 3. Delete selected payment method
# ============


def test_delete_success(service, mock_db_session):
    """Test to delete a payment method"""
    mock_db_session.query.return_value.filter.return_value.first.return_value = (
        PaymentMethod(id="pm_1")
    )

    service.delete(mock_db_session, user_id="user_123", payment_method_id="pm_1")
    mock_db_session.delete.assert_called_once()
    mock_db_session.commit.assert_called_once()


def test_delete_not_found_raises_error(service, mock_db_session):
    """Test to delete payment method, but not found"""
    mock_db_session.query.return_value.filter.return_value.first.return_value = None

    with pytest.raises(ValueError, match="not found or unauthorized"):
        service.delete(mock_db_session, user_id="user_123", payment_method_id="pm_999")
