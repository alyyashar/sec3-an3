from sqlalchemy import Column, String, DateTime, JSON
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime
import uuid

Base = declarative_base()

class AuditResult(Base):
    __tablename__ = 'audit_results'

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    contract_name = Column(String, nullable=True)
    contract_address = Column(String, nullable=True)
    scan_results = Column(JSON, nullable=False)  # Combine issues, AI verification, etc.
    created_at = Column(DateTime, default=datetime.utcnow)
