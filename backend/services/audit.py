import subprocess
import json
import os
from typing import List
from pydantic import BaseModel

# ======================
# DATA MODELS
# ======================

class Vulnerability(BaseModel):
    tool: str
    severity: str
    description: str
    location: str

class AuditResponse(BaseModel):
    issues_found: int
    vulnerabilities: List[Vulnerability]

# ======================
# SLITHER + MYTHRIL PARSING
# ======================

def parse_slither_output(report_path: str) -> List[Vulnerability]:
    vulnerabilities = []
    if os.path.exists(report_path):
        with open(report_path, "r") as file:
            try:
                report = json.load(file)
                # Slither stores findings in: results -> detectors
                for issue in report.get("results", {}).get("detectors", []):
                    vulnerabilities.append(Vulnerability(
                        tool="Slither",
                        severity=issue.get("impact", "Unknown"),
                        description=issue.get("check", "No description"),
                        location=", ".join(
                            issue.get("elements", [{}])[0]
                                 .get("source_mapping", {})
                                 .get("lines", [])
                        )
                    ))
            except json.JSONDecodeError:
                vulnerabilities.append(Vulnerability(
                    tool="Slither",
                    severity="Error",
                    description="Failed to parse Slither output",
                    location="N/A"
                ))
    return vulnerabilities

def parse_mythril_output(output: str) -> List[Vulnerability]:
    vulnerabilities = []
    try:
        report = json.loads(output)
        # Mythril has "issues" array
        for issue in report.get("issues", []):
            vulnerabilities.append(Vulnerability(
                tool="Mythril",
                severity=issue.get("severity", "Unknown"),
                description=issue.get("description", "No description"),
                location=f"Line {issue.get('lineno', 'N/A')}"
            ))
    except json.JSONDecodeError:
        vulnerabilities.append(Vulnerability(
            tool="Mythril",
            severity="Error",
            description="Failed to parse Mythril output",
            location="N/A"
        ))
    return vulnerabilities

# ======================
# CODE-BASED AUDIT
# ======================

def audit_contract(contract_code: str) -> AuditResponse:
    """
    Save the contract code to a temporary .sol file,
    run Slither & Mythril, parse results, and return them.
    """
    temp_contract = "temp_contract_code.sol"
    slither_json = "slither-report.json"

    try:
        # 1) Save the code to a .sol file
        with open(temp_contract, "w") as f:
            f.write(contract_code)

        # 2) Run Slither
        slither_proc = subprocess.run(
            ["slither", temp_contract, "--json", slither_json],
            capture_output=True, text=True
        )
        slither_findings = []
        if os.path.exists(slither_json):
            slither_findings = parse_slither_output(slither_json)

        # 3) Run Mythril
        mythril_proc = subprocess.run(
            ["myth", "analyze", temp_contract, "-o", "json"],
            capture_output=True, text=True
        )
        mythril_findings = parse_mythril_output(mythril_proc.stdout)

        # Combine
        vulnerabilities = slither_findings + mythril_findings
        return AuditResponse(
            issues_found=len(vulnerabilities),
            vulnerabilities=vulnerabilities
        )

    finally:
        # 4) Clean up files
        if os.path.exists(temp_contract):
            os.remove(temp_contract)
        if os.path.exists(slither_json):
            os.remove(slither_json)

