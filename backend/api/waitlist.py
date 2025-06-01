from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from db.database import get_db
from db.models import Waitlists
from datetime import datetime
from google.oauth2 import service_account
from googleapiclient.discovery import build
import os
import json
import base64

router = APIRouter(prefix="/api/waitlist", tags=["waitlist"])

# Google Sheets setup (fill in your actual file and sheet info)
b64_string = os.getenv("GOOGLE_SA_JSON_B64")
if not b64_string:
    raise RuntimeError("GOOGLE_SA_JSON_B64 environment variable is missing or empty. Please set it in your deployment environment.")
creds = json.loads(base64.b64decode(b64_string))
SCOPES = ['https://www.googleapis.com/auth/spreadsheets']
SPREADSHEET_ID = '1Jjnp4ZjTIX-2Y7PXGq5ZPrPEwVhzbDb19DyHTP6zWVA'
SHEET_NAME = 'Sheet1'

credentials = service_account.Credentials.from_service_account_info(
    creds, scopes=SCOPES
)
sheet_service = build('sheets', 'v4', credentials=credentials)

def append_email_to_sheet(email, createdAt):
    values = [[email, str(createdAt)]]
    sheet_service.spreadsheets().values().append(
        spreadsheetId=SPREADSHEET_ID,
        range=f"{SHEET_NAME}!A:B",
        valueInputOption='RAW',
        body={'values': values}
    ).execute()

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
        append_email_to_sheet(user.email, user.createdAt)
        print(f"[waitlist] Joined: {user.email} at {user.createdAt}")
        return {"email": user.email, "createdAt": user.createdAt}
    except Exception as e:
        print(f"[waitlist] Error: {e}")
        raise
