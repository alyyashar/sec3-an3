from fastapi import APIRouter, HTTPException, File, UploadFile, Depends
from sqlalchemy.orm import Session
from db.database import SessionLocal
from db.models import AuditResult
from pydantic import BaseModel
import tempfile
import os
import logging
from services.scanner import perform_scan
from services.web3_fetch import fetch_contract_source
from services.file_manager import FileManager
from services.ai_module import generate_fix
from db.database import get_db  # Make sure you imported get_db if using DB session

router = APIRouter()
file_manager = FileManager()
logging.basicConfig(level=logging.INFO)

class ContractAddressInput(BaseModel):
    contract_address: str

class CodeInput(BaseModel):
    contract_code: str  # Solidity code as a string

class FixRequest(BaseModel):
    contract_address: str
    line_number: int

@router.post("/file")
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

class ContractAddressInput(BaseModel):
    contract_address: str

class CodeInput(BaseModel):
    contract_code: str  # Solidity code as a string

class FixRequest(BaseModel):
    contract_address: str
    line_number: int

@router.post("/file")
async def scan_solidity_file(file: UploadFile = File(...), db: Session = Depends(get_db)):
    """
    Scan a Solidity contract file (.sol) uploaded by the user and store results in DB.
    """
    if not file.filename.endswith(".sol"):
        raise HTTPException(status_code=400, detail="Please upload a .sol file")

    contract_code = (await file.read()).decode()
    contract_path = file_manager.save_contract(contract_code, "contract")

    try:
        result = perform_scan(file_path=contract_path)

        # Store in DB
        db_result = AuditResult(
            contract_name=file.filename,
            contract_address=None,  # N/A for file uploads
            scan_results=result
        )
        db.add(db_result)
        db.commit()
        db.refresh(db_result)

        return {"message": "Analysis completed and stored", "audit_id": str(db_result.id), "result": result}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@router.post("/code")
async def scan_solidity_code(request: CodeInput):
    """
    Scan Solidity smart contract code pasted by the user.
    """
    if not request.contract_code.strip():
        raise HTTPException(status_code=400, detail="Code cannot be empty")

    contract_path = file_manager.save_contract(request.contract_code, "contract")

    try:
        result = perform_scan(file_path=contract_path)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/contract")
async def scan_contract_by_address(data: ContractAddressInput):
    """
    Scan a deployed contract by fetching its source code from Etherscan.
    """
    try:
        solidity_code = fetch_contract_source(data.contract_address)
        contract_path = file_manager.save_contract(solidity_code, "contract")

        result = perform_scan(file_path=contract_path)
        return result
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/fix")
async def apply_fix(data: FixRequest):
    """
    Apply AI-generated fix to a vulnerability in a contract.
    """
    try:
        solidity_code = fetch_contract_source(data.contract_address)
        contract_path = file_manager.save_contract(solidity_code, "contract")

        affected_code = solidity_code.split("\n")[data.line_number - 1]
        fixed_code = generate_fix("Unknown Issue", affected_code, solidity_code)

        fixed_contract_path = file_manager.apply_fix(contract_path, data.line_number, fixed_code)

        return {"fixed_contract_path": fixed_contract_path}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
