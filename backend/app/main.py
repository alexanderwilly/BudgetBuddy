from fastapi.security import HTTPBearer
import logging

from fastapi import FastAPI

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# to extract and parse Bearer tokens (such as JSON Web Tokens or JWTs) 
# from the Authorization header of incoming HTTP requests
security = HTTPBearer()

app = FastAPI(
    title="Expense Tracking System",
    description="An API for managing expenses and budgets",
    version="1.0.0",
)

