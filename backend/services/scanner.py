import subprocess
import json
import re
import logging
import tempfile
import os
from fastapi import HTTPException
from pydantic import BaseModel
from typing import List, Dict, Any
from ai_module import verify_vulnerabilities

logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

# Pydantic models for structured output
class Vulnerability(BaseModel):
    tool: str
    issue: str
    severity: str
    description: str
    location: Dict[str, Any]

class ScanReport(BaseModel):
    solidity_version: str
    contract_name: str
    tools_used: List[str]
    vulnerabilities: List[Vulnerability]
    summary: Dict[str, Any]

def extract_solidity_version(code: str) -> str:
    match = re.search(r"pragma solidity\s+([\^~>=]*\d+\.\d+\.\d+)", code)
    return match.group(1).strip() if match else None

def extract_contract_name(code: str) -> str:
    match = re.search(r"contract\s+(\w+)\s*{", code)
    return match.group(1) if match else "Unknown"

def install_solc_version(version: str):
    try:
        subprocess.run(["solc-select", "install", version], check=True)
        subprocess.run(["solc-select", "use", version], check=True)
    except subprocess.CalledProcessError:
        raise HTTPException(status_code=500, detail="Failed to install/use solc")

def run_mythril(contract_path: str) -> List[Vulnerability]:
    cmd = ["myth", "analyze", contract_path, "-o", "json", "--execution-timeout", "120"]
    proc = subprocess.run(cmd, capture_output=True, text=True)
    return parse_mythril_output(proc.stdout, contract_path)

def parse_mythril_output(output: str, contract_path: str) -> List[Vulnerability]:
    try:
        data = json.loads(output)
        return [
            Vulnerability(
                tool="mythril",
                issue=issue["title"],
                severity=issue.get("severity", "Medium"),
                description=issue["description"],
                location={"file": issue.get("filename", contract_path), "line": issue.get("lineno", 0)}
            ) for issue in data.get("issues", [])
        ]
    except json.JSONDecodeError:
        return []

def run_slither(contract_path: str) -> List[Vulnerability]:
    cmd = ["slither", contract_path, "--json", "-"]
    proc = subprocess.run(cmd, capture_output=True, text=True)
    return parse_slither_output(proc.stdout)

def parse_slither_output(output: str) -> List[Vulnerability]:
    try:
        data = json.loads(output)
        return [
            Vulnerability(
                tool="slither",
                issue=issue["check"],
                severity=issue.get("impact", "Medium"),
                description=issue["description"],
                location={
                    "file": issue["elements"][0]["source_mapping"]["filename_relative"],
                    "line": issue["elements"][0]["source_mapping"]["lines"][0]
                } if issue["elements"] else {}
            ) for issue in data.get("results", {}).get("detectors", [])
        ]
    except json.JSONDecodeError:
        return []

def generate_summary(findings: List[Vulnerability]) -> Dict[str, Any]:
    severity_counts = {"High": 0, "Medium": 0, "Low": 0, "Informational": 0, "Error": 0}
    for finding in findings:
        severity_counts[finding.severity] += 1
    return {"total_issues": len(findings), "severity_breakdown": severity_counts}

def perform_scan(file_path: str = None, code: str = None) -> dict:
    if code:
        temp_dir = tempfile.mkdtemp()
        contract_path = os.path.join(temp_dir, "contract.sol")
        with open(contract_path, "w") as f:
            f.write(code)
    elif file_path:
        contract_path = file_path
    else:
        raise HTTPException(status_code=400, detail="No contract provided.")

    try:
        with open(contract_path, "r") as f:
            solidity_code = f.read()

        solidity_version = extract_solidity_version(solidity_code)
        contract_name = extract_contract_name(solidity_code)
        install_solc_version(solidity_version)

        vulnerabilities = run_mythril(contract_path) + run_slither(contract_path)
        summary = generate_summary(vulnerabilities)

        scanner_results = ScanReport(
            solidity_version=solidity_version,
            contract_name=contract_name,
            tools_used=["mythril", "slither"],
            vulnerabilities=vulnerabilities,
            summary=summary
        ).dict()

        ai_verification = verify_vulnerabilities(solidity_code, scanner_results)
        return {"scanner_results": scanner_results, "ai_verification": ai_verification}

    finally:
        if code:
            os.remove(contract_path)
            os.rmdir(temp_dir)
