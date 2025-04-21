from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session
from db.database import get_db
from db.models import AuditResult
from services.ai_copilot import answer_security_query

router = APIRouter()

class CopilotQuery(BaseModel):
    question: str
    audit_id: str

@router.post("")
async def get_copilot_answer(query: CopilotQuery, db: Session = Depends(get_db)):
    # 1) load the stored scan result
    audit = db.query(AuditResult).filter_by(id=query.audit_id).first()
    if not audit:
        raise HTTPException(status_code=404, detail="Audit not found")

    # 2) use whatever JSON you saved in scan_results
    contract_data = audit.scan_results or {}
    if not isinstance(contract_data, dict) or not contract_data:
        raise HTTPException(status_code=500, detail="No contract data provided.")

    # 3) ask the AI
    result = answer_security_query(query.question, contract_data=contract_data)
    if "error" in result:
        raise HTTPException(status_code=500, detail=result["error"])
    return result
