from fastapi import APIRouter, HTTPException, File, UploadFile
from pydantic import BaseModel
import os
import tempfile
import logging
from services.scanner import perform_scan
from services.web3_fetch import fetch_contract_source  # Import the Etherscan contract fetcher

router = APIRouter()
logging.basicConfig(level=logging.INFO)

class ContractAddressInput(BaseModel):
    contract_address: str

@router.post("/")
async def scan_solidity_file(file: UploadFile = File(...)):
    """
    Scan a Solidity contract file (.sol) uploaded by the user.
    """
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
            os.rmdir(temp_dir)  # Cleanup temp directory

@router.post("/contract")
async def scan_contract_by_address(data: ContractAddressInput):
    """
    Scan a deployed contract by fetching its source code from Etherscan.
    """
    try:
        solidity_code = fetch_contract_source(data.contract_address)

        # Store contract in temp directory
        temp_dir = tempfile.mkdtemp()
        contract_path = os.path.join(temp_dir, "contract.sol")

        with open(contract_path, "w") as f:
            f.write(solidity_code)

        result = perform_scan(file_path=contract_path)

        return result
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        if os.path.exists(contract_path):
            os.remove(contract_path)
        if os.path.exists(temp_dir):
            os.rmdir(temp_dir)  # Cleanup temp directory
