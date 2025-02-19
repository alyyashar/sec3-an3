import subprocess
import json
import os
from typing import List, Dict
from pydantic import BaseModel

# ==============================
# Request & Response Models
# ==============================
class AuditRequest(BaseModel):
    contract_code: str

class Vulnerability(BaseModel):
    tool: str
    severity: str
    description: str
    location: str

class AuditResponse(BaseModel):
    issues_found: int
    vulnerabilities: List[Vulnerability]

# ==============================
# Utility Functions
# ==============================

def save_contract_to_file(contract_code: str) -> str:
    """
    Saves the provided Solidity contract to a temporary file.
    Returns the file path.
    """
    contract_path = "temp_contract.sol"
    with open(contract_path, "w") as file:
        file.write(contract_code)
    return contract_path

def parse_slither_output(report_path: str) -> List[Vulnerability]:
    """
    Parses the JSON output of Slither and extracts vulnerabilities.
    """
    vulnerabilities = []
    if os.path.exists(report_path):
        with open(report_path, "r") as file:
            try:
                report = json.load(file)
                for issue in report.get("results", {}).get("detectors", []):
                    vulnerabilities.append(Vulnerability(
                        tool="Slither",
                        severity=issue.get("impact", "Unknown"),
                        description=issue.get("check", "No description"),
                        location=", ".join(issue.get("elements", [{}])[0].get("source_mapping", {}).get("lines", []))
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
    """
    Parses Mythril's JSON output and extracts security issues.
    """
    vulnerabilities = []
    try:
        report = json.loads(output)
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

# ==============================
# Security Analysis Functions
# ==============================

def run_slither_analysis(contract_path: str) -> List[Vulnerability]:
    """
    Runs Slither analysis and returns a list of vulnerabilities.
    """
    report_path = "slither-report.json"
    try:
        subprocess.run(
            ["slither", contract_path, "--json", report_path],
            capture_output=True, text=True, check=True
        )
        return parse_slither_output(report_path)
    except subprocess.CalledProcessError as e:
        return [Vulnerability(tool="Slither", severity="Error", description=str(e), location="N/A")]

def run_mythril_analysis(contract_path: str) -> List[Vulnerability]:
    """
    Runs Mythril analysis and returns a list of vulnerabilities.
    """
    try:
        result = subprocess.run(
            ["myth", "analyze", contract_path, "-o", "json"],
            capture_output=True, text=True, check=True
        )
        return parse_mythril_output(result.stdout)
    except subprocess.CalledProcessError as e:
        return [Vulnerability(tool="Mythril", severity="Error", description=str(e), location="N/A")]

# ==============================
# Main Audit Function
# ==============================

def audit_contract(contract_code: str) -> AuditResponse:
    """
    Runs Slither & Mythril on a smart contract and returns structured vulnerabilities.
    """
    contract_path = save_contract_to_file(contract_code)
    slither_findings = run_slither_analysis(contract_path)
    mythril_findings = run_mythril_analysis(contract_path)

    vulnerabilities = slither_findings + mythril_findings
    return AuditResponse(
        issues_found=len(vulnerabilities),
        vulnerabilities=vulnerabilities
    )
