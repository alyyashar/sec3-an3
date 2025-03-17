from sqlalchemy.orm import sessionmaker
from .models import Base
from sqlalchemy import create_engine
import os

DATABASE_URL = os.getenv("DATABASE_URL")  # Ensure this is correctly set in Railway

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
