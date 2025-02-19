from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import logging
from services.scanner import perform_scan


router = APIRouter()
logging.basicConfig(level=logging.INFO)

class AuditRequest(BaseModel):
    contract_code: str  # Solidity code as a string

@router.post("/")
async def audit_contract_api(request: AuditRequest):
    try:
        result = perform_scan(code=request.contract_code)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
