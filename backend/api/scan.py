from fastapi import APIRouter, File, UploadFile, HTTPException
from services.audit import parse_slither_output, parse_mythril_output
from services.audit import AuditResponse, Vulnerability
import subprocess
import os
import tempfile

router = APIRouter()

@router.post("/scan", response_model=AuditResponse)
async def scan_solidity_file(file: UploadFile = File(...)):
    """
    Accepts an uploaded .sol file, runs Slither + Mythril, and returns vulnerabilities.
    """
    if not file.filename.endswith(".sol"):
        raise HTTPException(status_code=400, detail="Please upload a .sol file")

    temp_dir = tempfile.gettempdir()
    contract_path = os.path.join(temp_dir, file.filename)
    slither_json_path = os.path.join(temp_dir, "slither-report.json")

    try:
        # Save the uploaded file
        with open(contract_path, "wb") as f:
            f.write(await file.read())

        # Run Slither
        subprocess.run(
            ["slither", contract_path, "--json", slither_json_path],
            capture_output=True, text=True
        )
        slither_findings = []
        if os.path.exists(slither_json_path):
            slither_findings = parse_slither_output(slither_json_path)

        # Run Mythril
        mythril_proc = subprocess.run(
            ["myth", "analyze", contract_path, "-o", "json"],
            capture_output=True, text=True
        )
        mythril_findings = parse_mythril_output(mythril_proc.stdout)

        # Combine
        vulnerabilities = slither_findings + mythril_findings
        return AuditResponse(
            issues_found=len(vulnerabilities),
            vulnerabilities=vulnerabilities
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        # Cleanup
        if os.path.exists(contract_path):
            os.remove(contract_path)
        if os.path.exists(slither_json_path):
            os.remove(slither_json_path)
