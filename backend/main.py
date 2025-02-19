from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api import audit  # Import the audit module

app = FastAPI()

# ✅ Allow requests from your Vercel frontend
origins = [
    "https://sec3-an3.vercel.app",  # Replace with your exact Vercel frontend URL
    "http://localhost:3000",  # Allow local development
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # ✅ Allow specific frontend URLs
    allow_credentials=True,
    allow_methods=["*"],  # ✅ Allow all methods (GET, POST, etc.)
    allow_headers=["*"],  # ✅ Allow all headers
)

# ✅ Include audit API router
app.include_router(audit.router, prefix="/api")

@app.get("/")
def home():
    return {"message": "Welcome to SEC3 API"}
