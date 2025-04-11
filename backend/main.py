from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.scan import router as scan_router
from api.copilot import router as copilot_router  # Import the new copilot router
from db.database import Base, engine
from db import models  # Ensure models are loaded

app = FastAPI(title="N3XUS API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origin_regex=r"https://.*\.vercel\.app",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include both scan and copilot routers.
app.include_router(scan_router, prefix="/api/scan", tags=["scan"])  
app.include_router(copilot_router, prefix="/api/copilot", tags=["copilot"])

# Ensure DB tables are created on startup
Base.metadata.create_all(bind=engine)

@app.get("/")
def home():
    return {"message": "Welcome to N3XUS API"}
