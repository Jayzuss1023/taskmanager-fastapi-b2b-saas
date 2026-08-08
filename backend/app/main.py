from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.core.database import engine, Base
from app.api import tasks, webhooks

# Initialize database. Create if not yet created
Base.metadata.create_all(bind=engine)

# Initialize app
app = FastAPI(
    title="Task Board API",
    description="B2B Task Board App",
    version="1.0.0"
)

# Add middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.FRONTEND_URL], # Allow front end access
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# Initialize route methods
app.include_router(tasks.router)
# app.include_router(webhooks.router)
