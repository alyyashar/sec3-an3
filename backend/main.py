from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.scan import router as scan_router
from api.copilot import router as copilot_router 
from api.attestation import router as attestation_router
from db.database import Base, engine
from db import models  

app = FastAPI(title="N3XUS API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origin_regex=r"https://.*\.vercel\.app",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(scan_router, prefix="/api/scan", tags=["scan"])  
app.include_router(copilot_router, prefix="/api/copilot", tags=["copilot"])
app.include_router(attestation_router, prefix="/api/attestation", tags=["attestation"])

Base.metadata.create_all(bind=engine)

@app.get("/")
def home():
    return {"message": "Welcome to N3XUS API"}
