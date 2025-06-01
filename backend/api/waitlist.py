from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from db.database import get_db
from db.models import Waitlists
from datetime import datetime
from google.oauth2 import service_account
from googleapiclient.discovery import build

router = APIRouter(prefix="/api/waitlist", tags=["waitlist"])

# Google Sheets setup (fill in your actual file and sheet info)
SERVICE_ACCOUNT_FILE = 'service-file/an3-sheets-d2d50e801e4e.json'
SCOPES = ['https://www.googleapis.com/auth/spreadsheets']
SPREADSHEET_ID = '1Jjnp4ZjTIX-2Y7PXGq5ZPrPEwVhzbDb19DyHTP6zWVA'
SHEET_NAME = 'Sheet1'

credentials = service_account.Credentials.from_service_account_file(
    SERVICE_ACCOUNT_FILE, scopes=SCOPES
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
