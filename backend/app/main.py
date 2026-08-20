import logging

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.db.database import Base, engine
from app.routes.auth import router as auth_router
from app.routes.payment_method import router as payment_method_router

# Create all tables
Base.metadata.create_all(bind=engine)

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="Expense Tracking System",
    description="An API for managing expenses and budgets",
    version="1.0.0",
)

# Add CORS Middleware to allow requests from the frontend (with cookies)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router, prefix="/api/auth", tags=["auth"])
app.include_router(
    payment_method_router, prefix="/api/payment-methods", tags=["payment-methods"]
)


@app.get("/")
def read_root():
    return {"Hello": "World"}
