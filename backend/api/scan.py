from fastapi import APIRouter, HTTPException, File, UploadFile
import os
import tempfile
import logging
from services.scanner import perform_scan

router = APIRouter()
logging.basicConfig(level=logging.INFO)

@router.post("/")
async def scan_solidity_file(file: UploadFile = File(...)):
    if not file.filename.endswith(".sol"):
        raise HTTPException(status_code=400, detail="Please upload a .sol file")

    # Always rename the file to "contract.sol" in a unique temp directory
    temp_dir = tempfile.mkdtemp()
    contract_path = os.path.join(temp_dir, "contract.sol")
    with open(contract_path, "wb") as f:
        f.write(await file.read())

    try:
        result = perform_scan(file_path=contract_path)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        if os.path.exists(contract_path):
            os.remove(contract_path)
        if os.path.exists(temp_dir):
            os.rmdir(temp_dir)  # optional: remove the temp directory too
