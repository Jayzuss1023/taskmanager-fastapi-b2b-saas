# Handler for settings for app
import os
from dotenv import load_dotenv

load_dotenv()

# Standard in FastAPI to store all keys in a Class
class Config():
    CLERK_SECRET_KEY: str = os.getenv("CLERK_SECRET_KEY", "")
    CLERK_PUBLISHABLE_KEY: str = os.getenv("CLERK_PUBLISHABLE_KEY", "")
    CLERK_WEBHOOK_SECRET: str = os.getenv("CLERK_WEBHOOK_SECRET", "")
    CLERK_JWKS_URL: str = os.getenv("CLERK_JWKS_URL", "")

    DATABASE_URL: str = os.getenv("DATABASE_URL", "")
    FRONTEND_URL: str = os.getenv("FRONTEND_URL", "")

    FREE_TIER_LIMIT: int = 2
    PRO_TIER_MEMBERSHIP = 0 #unlimited


settings = Config()