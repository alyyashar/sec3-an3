from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from services.audit import audit_contract, AuditResponse

router = APIRouter()

class AuditRequest(BaseModel):
    contract_code: str  # The Solidity code as a string

@router.post("/audit", response_model=AuditResponse)
async def audit_smart_contract(request: AuditRequest):
    """
    Accepts Solidity code as a string, runs Slither + Mythril, 
    and returns vulnerabilities.
    """
    try:
        result = audit_contract(request.contract_code)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
