from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from db.database import get_db
from db.models import AuditResult
import hashlib
import json
from datetime import datetime

router = APIRouter()

@router.post("/attestation/{audit_id}")
async def generate_attestation(audit_id: str, db: Session = Depends(get_db)):
    audit = db.query(AuditResult).filter_by(id=audit_id).first()
    if not audit:
        raise HTTPException(status_code=404, detail="Audit not found")

    if not audit.scan_results:
        raise HTTPException(status_code=400, detail="Scan results missing for audit")

    # Hash the scan results deterministically
    serialized = json.dumps(audit.scan_results, sort_keys=True)
    attestation_hash = "0x" + hashlib.sha256(serialized.encode()).hexdigest()

    return {
        "attestation_hash": attestation_hash,
        "method": "IPFS (ZK optional)",
        "chain": "IPFS (off-chain)",
        "status": "Pending",
        "created_at": datetime.utcnow().isoformat(),
        "audit_id": str(audit.id),
        "contract_name": audit.contract_name,
        "contract_address": audit.contract_address
    }
