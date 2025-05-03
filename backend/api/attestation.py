from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from datetime import datetime
import hashlib
import random

from db.models import AuditResult
from db.database import get_db

# No prefix here—prefix is applied in main.py
router = APIRouter(tags=["attestation"])

# -------------------------------
# Util: Create fake attestation
# -------------------------------
def generate_fake_attestation_data(audit_id: str):
    hash_input = f"{audit_id}-{random.randint(1000, 9999)}-{datetime.utcnow()}"
    attestation_hash = hashlib.sha256(hash_input.encode()).hexdigest()
    return {
        "attestation_hash": f"0x{attestation_hash[:64]}",
        "method": "Zero-Knowledge Proof",
        "chain": "Ethereum",
        "status": "Verified",
        "created_at": datetime.utcnow().isoformat()
    }

# -------------------------------
# POST /api/attestation/{audit_id}
# -------------------------------
@router.post("/{audit_id}")
def generate_attestation(audit_id: str, db: Session = Depends(get_db)):
    audit = db.query(AuditResult).filter_by(id=audit_id).first()
    if not audit:
        raise HTTPException(status_code=404, detail="Audit not found")

    # TODO: Persist attestation to DB or IPFS here
    attestation = generate_fake_attestation_data(audit_id)

    return attestation

# -------------------------------
# GET /api/attestation/{audit_id}
# -------------------------------
@router.get("/{audit_id}")
def get_attestation(audit_id: str, db: Session = Depends(get_db)):
    audit = db.query(AuditResult).filter_by(id=audit_id).first()
    if not audit:
        raise HTTPException(status_code=404, detail="Audit not found")

    # Simulated: even-numbered UUIDs have attestations
    try:
        audit_int = int(audit.id)
    except ValueError:
        audit_int = random.randint(1, 1000)

    if audit_int % 2 == 0:
        return {
            "attestation_hash": f"0xdeadbeef{audit_id.zfill(56)}",
            "method": "Zero-Knowledge Proof",
            "chain": "Ethereum",
            "status": "Verified",
            "created_at": datetime.utcnow().isoformat()
        }

    raise HTTPException(status_code=404, detail="Attestation not yet generated")
