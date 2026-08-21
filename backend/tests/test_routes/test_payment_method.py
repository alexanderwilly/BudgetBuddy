import uuid
from datetime import datetime
import pytest
from app.main import app
from app.dependencies.auth import get_current_user
from app.dependencies.payment_methods import get_payment_method_service


# Helper to apply and clean up overrides easily
@pytest.fixture(autouse=True)
def override_dependencies(mock_current_user, mock_payment_service):
    app.dependency_overrides[get_current_user] = lambda: mock_current_user
    app.dependency_overrides[get_payment_method_service] = lambda: mock_payment_service
    yield
    app.dependency_overrides.clear()


# ============
# 1. Add new payment method
# ============


def test_add_payment_method_route_201(api_client, mock_payment_service):
    mock_payment_service.add.return_value.name = "Stripe"
    mock_payment_service.add.return_value.id = uuid.uuid4()
    mock_payment_service.add.return_value.user_id = uuid.uuid4()
    mock_payment_service.add.return_value.created_at = datetime.now()
    mock_payment_service.add.return_value.updated_at = datetime.now()

    response = api_client.post("/api/payment-methods/add", json={"name": "Stripe"})
    assert response.status_code == 201
    assert response.json()["name"] == "Stripe"


def test_add_payment_method_route_400(api_client, mock_payment_service):
    mock_payment_service.add.side_effect = ValueError("Already exists")

    response = api_client.post("/api/payment-methods/add", json={"name": "Stripe"})
    assert response.status_code == 400
    assert response.json()["detail"] == "Already exists"


# ============
# 2. Get all payment methods correspond to the user
# ============


def test_get_payment_methods_route_200(api_client, mock_payment_service):
    # Simulating a returned list of objects
    class DummyPM:
        id = uuid.uuid4()
        user_id = uuid.uuid4()
        name = "Cash"
        created_at = datetime.now()
        updated_at = datetime.now()

    mock_payment_service.get_all.return_value = [DummyPM()]

    response = api_client.get("/api/payment-methods/")
    assert response.status_code == 200
    assert len(response.json()) == 1
    assert response.json()[0]["name"] == "Cash"


# ============
# 3. Delete selected payment method
# ============


def test_delete_payment_method_route_204(api_client, mock_payment_service):
    mock_payment_service.delete.return_value = None

    response = api_client.delete("/api/payment-methods/pm_1")
    assert response.status_code == 204


def test_delete_payment_method_route_404(api_client, mock_payment_service):
    mock_payment_service.delete.side_effect = ValueError("Not found")

    response = api_client.delete("/api/payment-methods/pm_999")
    assert response.status_code == 404
