from fastapi import APIRouter, HTTPException
from db.models import AuditResult
from db.database import get_db
from sqlalchemy.orm import Session
from fastapi import Depends
from datetime import datetime
import hashlib
import random

router = APIRouter(prefix="/api/attestation", tags=["attestation"])

# Util to create fake attestation data
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

# ✅ POST: Generate new attestation
@router.post("/{audit_id}")
def generate_attestation(audit_id: str, db: Session = Depends(get_db)):
    audit = db.query(AuditResult).filter_by(id=audit_id).first()
    if not audit:
        raise HTTPException(status_code=404, detail="Audit not found")

    # Generate fake attestation (replace with real logic later)
    attestation = generate_fake_attestation_data(audit_id)

    # Save it into a new column if needed (not implemented yet)
    # audit.attestation_data = attestation
    # db.commit()

    return attestation

# ✅ GET: Fetch existing attestation (in real logic, from DB or IPFS)
@router.get("/{audit_id}")
def get_attestation(audit_id: str, db: Session = Depends(get_db)):
    # In real setup, you'd fetch from a real store or check if stored in DB
    audit = db.query(AuditResult).filter_by(id=audit_id).first()
    if not audit:
        raise HTTPException(status_code=404, detail="Audit not found")

    # Dummy check to simulate "already attested" state
    if int(audit.id) % 2 == 0:
        # Simulate that even-numbered IDs already have attestations
        return {
            "attestation_hash": f"0xdeadbeef{audit_id.zfill(56)}",
            "method": "Zero-Knowledge Proof",
            "chain": "Ethereum",
            "status": "Verified",
            "created_at": datetime.utcnow().isoformat()
        }

    raise HTTPException(status_code=404, detail="Attestation not yet generated")
