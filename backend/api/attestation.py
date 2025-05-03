from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from datetime import datetime
import hashlib
import json

from db.models import AuditResult
from db.database import get_db

router = APIRouter(prefix="/api/attestation", tags=["attestation"])

def make_attestation_from_scan(audit: AuditResult) -> dict:
    """
    Serialize audit.scan_results and compute SHA-256 attestation.
    """
    scan_payload = audit.scan_results
    if not scan_payload:
        raise HTTPException(status_code=400, detail="No scan_results available")

    serialized = json.dumps(scan_payload, sort_keys=True)
    h = hashlib.sha256(serialized.encode()).hexdigest()

    return {
        "attestation_hash": f"0x{h}",
        "method": "SHA-256",
        "chain": "Off-chain (IPFS-ready)",
        "status": "Verified",
        "created_at": datetime.utcnow().isoformat()
    }

@router.post("/{audit_id}")
def generate_attestation(audit_id: str, db: Session = Depends(get_db)):
    """
    Generate and persist an attestation for audit_id.
    """
    audit = db.query(AuditResult).filter_by(id=audit_id).first()
    if not audit:
        raise HTTPException(status_code=404, detail="Audit not found")

    att = make_attestation_from_scan(audit)

    # Persist into a new JSONB column `attestation` on AuditResult
    audit.attestation = att
    db.commit()

    return att

@router.get("/{audit_id}")
def get_attestation(audit_id: str, db: Session = Depends(get_db)):
    """
    Fetch an existing attestation for audit_id.
    """
    audit = db.query(AuditResult).filter_by(id=audit_id).first()
    if not audit:
        raise HTTPException(status_code=404, detail="Audit not found")

    if not getattr(audit, "attestation", None):
        raise HTTPException(status_code=404, detail="Attestation not yet generated")

    return audit.attestation
