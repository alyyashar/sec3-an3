from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.scan import router as scan_router
from api.audit import router as audit_router

app = FastAPI(title="KONSEC API", version="1.0.0")

origins = ["http://localhost:3000", "https://sec3-an3.vercel.app"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(scan_router, prefix="/api/scan", tags=["scan"])
app.include_router(audit_router, prefix="/api/audit", tags=["audit"])

@app.get("/")
def home():
    return {"message": "Welcome to KONSEC API"}
