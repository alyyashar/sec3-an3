# backend/api/attestation.py

from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from datetime import datetime
import hashlib
import json

from db.models import AuditResult
from db.database import get_db

router = APIRouter(tags=["attestation"])

def make_attestation_from_scan(audit: AuditResult) -> dict:
    """
    Given an AuditResult ORM object, serialize its scan_results
    and compute a SHA-256 hash as the attestation.
    """
    scan_payload = audit.scan_results
    if not scan_payload:
        raise HTTPException(status_code=400, detail="No scan_results available")

    # 1. Deterministic JSON serialization
    serialized = json.dumps(scan_payload, sort_keys=True)
    # 2. SHA-256 hash
    h = hashlib.sha256(serialized.encode()).hexdigest()

    return {
        "attestation_hash": f"0x{h}",
        "method": "SHA-256",
        "chain": "Off-chain (IPFS-ready)",
        "status": "Verified",
        "created_at": datetime.utcnow().isoformat()
    }

# POST /api/attestation/{audit_id}
@router.post("/api/attestation/{audit_id}")
def generate_attestation(audit_id: str, db: Session = Depends(get_db)):
    """
    Generate (or regenerate) an attestation for the given audit_id
    by hashing the stored scan_results.
    """
    audit = db.query(AuditResult).filter_by(id=audit_id).first()
    if not audit:
        raise HTTPException(status_code=404, detail="Audit not found")

    attestation = make_attestation_from_scan(audit)

    # Optional: persist to DB here if you add a column to AuditResult
    # audit.attestation = attestation
    # db.commit()

    return attestation

# GET /api/attestation/{audit_id}
@router.get("/api/attestation/{audit_id}")
def get_attestation(audit_id: str, db: Session = Depends(get_db)):
    """
    Fetch the current attestation for the given audit_id.
    If you persist it, you could pull from a column; here
    we recompute it on-the-fly from scan_results.
    """
    audit = db.query(AuditResult).filter_by(id=audit_id).first()
    if not audit:
        raise HTTPException(status_code=404, detail="Audit not found")

    # Re-use the same logic to produce the attestation
    return make_attestation_from_scan(audit)
