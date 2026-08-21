import pytest
from unittest.mock import MagicMock
from fastapi.testclient import TestClient

from app.main import app
from app.models.user import User

# Import Services
from app.services.payment_method_service import PaymentMethodService
# from app.services.user_service import UserService

# ==========================================
# 1. CORE / INFRASTRUCTURE FIXTURES
# ==========================================


@pytest.fixture
def mock_db_session():
    """Provides a mocked SQLAlchemy session for all service tests."""
    return MagicMock()


@pytest.fixture
def api_client():
    """Provides the FastAPI TestClient for all route tests."""
    return TestClient(app)


@pytest.fixture
def mock_current_user():
    """Provides a mocked authenticated user."""
    user = MagicMock(spec=User)
    user.id = "user_123"
    user.email = "test@example.com"
    return user


# ==========================================
# 2. MOCKED SERVICE FIXTURES
# ==========================================


@pytest.fixture
def mock_payment_service():
    return MagicMock(spec=PaymentMethodService)


# @pytest.fixture
# def mock_user_service():
#     return MagicMock(spec=UserService)
