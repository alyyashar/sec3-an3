from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from db.database import get_db
from db.models import Waitlists
from datetime import datetime

router = APIRouter(prefix="/api/waitlist", tags=["waitlist"])

@router.post("/", status_code=201)
def join_waitlist(email: str, db: Session = Depends(get_db)):
    try:
        print(f"[waitlist] Attempting to join: {email}")
        if not email:
            raise HTTPException(status_code=400, detail="Email is required")
        existing = db.query(Waitlists).filter(Waitlists.email == email).first()
        if existing:
            print(f"[waitlist] Already joined: {email}")
            raise HTTPException(status_code=400, detail="Already Joined")
        user = Waitlists(email=email, createdAt=datetime.utcnow())
        db.add(user)
        db.commit()
        db.refresh(user)
        print(f"[waitlist] Joined: {user.email} at {user.createdAt}")
        return {"email": user.email, "createdAt": user.createdAt}
    except Exception as e:
        print(f"[waitlist] Error: {e}")
        raise
