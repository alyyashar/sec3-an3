from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.scan import router as scan_router  # Only scan.py is needed now
from db.database import Base, engine
from db import models  # Ensure models are loaded

app = FastAPI(title="N3XUS API", version="1.0.0")

origins = [
    "http://localhost:3000",  # Local dev
    "https://sec3-an3.vercel.app",  # Production Vercel domain
    "https://sec3-an3-ogqm23qse-alyyashars-projects.vercel.app",  # Your Vercel deployment
    "https://sec3-an3-production.up.railway.app",  # Backend on Railway
    "https://*.vercel.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Allow frontend domains
    allow_credentials=True,
    allow_origin_regex=r"https:\/\/sec3-an3(-[a-z0-9]+)?\.alyyashars-projects\.vercel\.app"
    allow_methods=["*"],  # Allow all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

app.include_router(scan_router, prefix="/api/scan", tags=["scan"])  

# Ensure DB tables are created on startup
Base.metadata.create_all(bind=engine)

@app.get("/")
def home():
    return {"message": "Welcome to N3XUS API"}



