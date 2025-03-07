import subprocess
import json
import re
import logging
import tempfile
import os
from fastapi import HTTPException
from pydantic import BaseModel
from typing import List, Dict, Any
from services.ai_module import verify_vulnerabilities  # Ensure ai_module exists

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
        result = subprocess.run(["solc-select", "versions"], capture_output=True, text=True)
        if result.returncode != 0:
            logger.error(f"solc-select versions failed: stdout='{result.stdout}', stderr='{result.stderr}'")
            raise HTTPException(status_code=500, detail=f"solc-select is not working properly: {result.stderr or 'No error output'}")
        installed_versions = result.stdout
        logger.info(f"Installed versions: {installed_versions}")
        if version not in installed_versions:
            logger.info(f"Installing Solidity {version}...")
            install_proc = subprocess.run(["solc-select", "install", version], capture_output=True, text=True)
            if install_proc.returncode != 0:
                logger.error(f"Failed installing solc {version}: stdout='{install_proc.stdout}', stderr='{install_proc.stderr}'")
                raise HTTPException(status_code=500, detail=f"Failed installing solc {version}: {install_proc.stderr or 'No error output'}")
        logger.info(f"Switching to Solidity {version}...")
        use_proc = subprocess.run(["solc-select", "use", version], capture_output=True, text=True)
        if use_proc.returncode != 0:
            logger.error(f"Failed switching to solc {version}: stdout='{use_proc.stdout}', stderr='{use_proc.stderr}'")
            raise HTTPException(status_code=500, detail=f"Failed switching to solc {version}: {use_proc.stderr or 'No error output'}")
        current_version = subprocess.run(["solc", "--version"], capture_output=True, text=True)
        if current_version.returncode != 0:
            logger.error(f"solc --version failed: stdout='{current_version.stdout}', stderr='{current_version.stderr}'")
            raise HTTPException(status_code=500, detail=f"Failed to verify solc version: {current_version.stderr or 'No error output'}")
        logger.info(f"Current solc version: {current_version.stdout}")
    except FileNotFoundError:
        logger.error("solc-select not found in PATH")
        raise HTTPException(status_code=500, detail="solc-select not found in PATH")

def run_mythril(contract_path: str) -> List[Vulnerability]:
    cmd = ["myth", "analyze", contract_path, "-o", "json", "--execution-timeout", "120"]
    proc = subprocess.run(cmd, capture_output=True, text=True)
    
    if not proc.stdout.strip():  # Handle empty output
        logger.warning(f"Mythril did not return any output for {contract_path}")
        return []

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
        logger.error(f"Failed to parse Mythril output: {output}")
        return []

def run_slither(contract_path: str) -> List[Vulnerability]:
    cmd = ["slither", contract_path, "--json", "-"]
    proc = subprocess.run(cmd, capture_output=True, text=True)

    if not proc.stdout.strip():  # Handle empty output
        logger.warning(f"Slither did not return any output for {contract_path}")
        return []

    return parse_slither_output(proc.stdout)

def parse_slither_output(output: str) -> List[Vulnerability]:
    try:
        data = json.loads(output)
        vulnerabilities = []
        for issue in data.get("results", {}).get("detectors", []):
            location = {}
            if issue.get("elements") and isinstance(issue["elements"], list):
                element = issue["elements"][0]
                if "source_mapping" in element:
                    location = {
                        "file": element["source_mapping"].get("filename_relative", "Unknown"),
                        "line": element["source_mapping"].get("lines", [0])[0]
                    }

            vulnerabilities.append(Vulnerability(
                tool="slither",
                issue=issue["check"],
                severity=issue.get("impact", "Medium"),
                description=issue["description"],
                location=location
            ))

        return vulnerabilities

    except json.JSONDecodeError:
        logger.error(f"Failed to parse Slither output: {output}")
        return []

def generate_summary(findings: List[Vulnerability]) -> Dict[str, Any]:
    severity_counts = {"High": 0, "Medium": 0, "Low": 0, "Informational": 0, "Error": 0}
    
    for finding in findings:
        severity_counts[finding.severity] = severity_counts.get(finding.severity, 0) + 1

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
        if not solidity_version:
            raise HTTPException(status_code=400, detail="Could not detect Solidity version.")

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
        if code and os.path.exists(contract_path):
            os.remove(contract_path)
        if code and os.path.exists(temp_dir):
            os.rmdir(temp_dir)
