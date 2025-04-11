# backend/api/copilot.py
from fastapi import APIRouter, HTTPException, Depends, Request
from pydantic import BaseModel
from services.ai_copilot import answer_security_query
from sqlalchemy.orm import Session
from db.database import get_db
from db.models import AuditResult  # Ensure your AuditResult model is imported

router = APIRouter()

class CopilotQuery(BaseModel):
    question: str
    audit_id: str  # Include the audit id here

@router.post("")
async def get_copilot_answer(query: CopilotQuery, db: Session = Depends(get_db)):
    # Retrieve the audit result from the database
    audit_result = db.query(AuditResult).filter_by(id=query.audit_id).first()
    if not audit_result:
        raise HTTPException(status_code=404, detail="Audit not found")
    
    # Extract scan results – adjust if your DB schema stores it differently
    contract_data = audit_result.scan_results.get("result") if isinstance(audit_result.scan_results, dict) else audit_result.scan_results

    result = answer_security_query(query.question, contract_data=contract_data)
    if "error" in result:
        raise HTTPException(status_code=500, detail=result["error"])
    return result
