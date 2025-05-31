from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.scan import router as scan_router
from api.copilot import router as copilot_router
from api.attestation import router as attestation_router
from auth.auth_router import router as auth_router  
from api.waitlist import router as waitlist_router

from db.database import Base, engine
import db.models

app = FastAPI(title="N3XUS API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origin_regex=r"https://.*\.vercel\.app|http://localhost:3000",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Routers
app.include_router(scan_router, prefix="/api/scan", tags=["scan"])
app.include_router(copilot_router, prefix="/api/copilot", tags=["copilot"])
app.include_router(attestation_router)
app.include_router(auth_router, prefix="/api", tags=["auth"])
app.include_router(waitlist_router)

Base.metadata.create_all(bind=engine)

@app.get("/")
def home():
    return {"message": "Welcome to N3XUS API"}
