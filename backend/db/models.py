from sqlalchemy import Column, String, DateTime
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime
import uuid

Base = declarative_base()

class AuditResult(Base):
    __tablename__ = 'audit_results'

    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
        index=True
    )
    contract_name = Column(String, nullable=True)
    contract_address = Column(String, nullable=True)
    scan_results = Column(
        JSONB,
        nullable=False,
        comment="Raw scanner + AI results"
    )
    created_at = Column(
        DateTime(timezone=True),
        default=datetime.utcnow,
        nullable=False
    )

    # New column to store the generated attestation JSON
    attestation = Column(
        JSONB,
        nullable=True,
        comment="SHA-256 attestation of scan_results"
    )
