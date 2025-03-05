import subprocess
import json
import re
import logging
import tempfile
import os
from fastapi import HTTPException
from pydantic import BaseModel
from typing import List, Dict, Any
from llama_cpp import Llama

logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

# Load Code Llama Model
MODEL_PATH = "/app/models/codellama-13b.Q4_K_M.gguf"
llm = Llama(model_path=MODEL_PATH, n_ctx=4096, n_threads=4)

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
    if match:
        version = match.group(1).strip()
        if "^" in version or "~" in version or ">=" in version:
            version = version.replace("^", "").replace("~", "").split(" ")[0]
        logger.info(f"Detected Solidity version: {version}")
        return version
    return None

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
    abs_path = os.path.abspath(contract_path)
    which_solc = subprocess.run(["which", "solc"], capture_output=True, text=True).stdout.strip()
    logger.info(f"Using solc from: {which_solc}")
    solc_version = subprocess.run([which_solc, "--version"], capture_output=True, text=True).stdout
    logger.info(f"solc version: {solc_version}")
    cmd = [
        "myth", "analyze", abs_path,
        "-o", "json",
        "--execution-timeout", "120",
        "--max-depth", "50"
    ]
    logger.info("Running Mythril: " + " ".join(cmd))
    proc = subprocess.run(cmd, capture_output=True, text=True)
    logger.info(f"Mythril raw output: stdout='{proc.stdout}', stderr='{proc.stderr}'")
    try:
        if not proc.stdout:
            logger.warning("Mythril produced no output")
            return [Vulnerability(
                tool="mythril",
                issue="No output",
                severity="Error",
                description="Mythril ran but produced no output",
                location={"file": abs_path, "line": 0}
            )]
        output = json.loads(proc.stdout)
        findings = []
        if output.get("success", False):
            for issue in output.get("issues", []):
                findings.append(Vulnerability(
                    tool="mythril",
                    issue=issue["title"],
                    severity=issue.get("severity", "Medium"),
                    description=issue["description"],
                    location={"file": issue.get("filename", ""), "line": issue.get("lineno", 0)}
                ))
            if not findings:
                findings.append(Vulnerability(
                    tool="mythril",
                    issue="No issues found",
                    severity="Informational",
                    description="Mythril completed analysis and detected no vulnerabilities in the contract",
                    location={"file": abs_path, "line": 0}
                ))
            logger.info(f"Mythril findings: {len(findings)} issues detected")
            return findings
        else:
            logger.error(f"Mythril analysis failed: {output.get('error', 'Unknown error')}")
            return [Vulnerability(
                tool="mythril",
                issue="Analysis failed",
                severity="Error",
                description=f"Mythril failed: {output.get('error', 'No error message')}",
                location={"file": abs_path, "line": 0}
            )]
    except json.JSONDecodeError:
        logger.error(f"Mythril output invalid: stdout='{proc.stdout}'")
        return [Vulnerability(
            tool="mythril",
            issue="Invalid output",
            severity="Error",
            description="Mythril output is not valid JSON",
            location={"file": abs_path, "line": 0}
        )]

def run_slither(contract_path: str, solidity_version: str) -> List[Vulnerability]:
    abs_path = os.path.abspath(contract_path)
    if solidity_version.startswith("0.6."):
        remaps = "@openzeppelin=./oz-3.4.2/node_modules/@openzeppelin"
    elif solidity_version.startswith("0.8."):
        remaps = "@openzeppelin=./oz-4.9.3/node_modules/@openzeppelin"
    elif solidity_version.startswith("0.4."):
        remaps = None
    else:
        remaps = "@openzeppelin=./oz-3.4.2/node_modules/@openzeppelin"
    cmd = ["slither", abs_path, "--json", "-"]
    if remaps:
        cmd.extend(["--solc-remaps", remaps])
    logger.info("Running Slither: " + " ".join(cmd))
    proc = subprocess.run(cmd, capture_output=True, text=True)
    logger.info(f"Slither completed with return code {proc.returncode}: stdout='{proc.stdout[:100]}...', stderr='{proc.stderr}'")
    try:
        if not proc.stdout:
            logger.warning("Slither produced no output")
            return []
        output = json.loads(proc.stdout)
        findings = []
        if output.get("success", False) and "results" in output and "detectors" in output["results"]:
            for issue in output["results"]["detectors"]:
                findings.append(Vulnerability(
                    tool="slither",
                    issue=issue["check"],
                    severity=issue.get("impact", "Medium"),
                    description=issue["description"],
                    location={
                        "file": issue["elements"][0]["source_mapping"]["filename_relative"],
                        "line": issue["elements"][0]["source_mapping"]["lines"][0]
                    } if issue["elements"] else {}
                ))
        return findings
    except json.JSONDecodeError:
        logger.error(f"Slither output invalid JSON: {proc.stdout}")
        return [Vulnerability(
            tool="slither",
            issue="Invalid output",
            severity="Error",
            description="Slither output is not valid JSON",
            location={}
        )]

def generate_summary(findings: List[Vulnerability]) -> Dict[str, Any]:
    total = len(findings)
    severity_counts = {"High": 0, "Medium": 0, "Low": 0, "Informational": 0, "Error": 0}
    for finding in findings:
        severity = finding.severity
        if severity in severity_counts:
            severity_counts[severity] += 1
        else:
            severity_counts["Medium"] += 1
    return {"total_issues": total, "severity_breakdown": severity_counts}

def verify_vulnerabilities(contract_code: str, scanner_results: Dict[str, Any]) -> str:
    prompt = f"""
    You are a Solidity security expert. Given the contract code below:

    {contract_code}

    And the following vulnerability findings:
    {json.dumps(scanner_results, indent=2)}

    Tasks:
    1. Verify if each reported issue is valid.
    2. Identify false positives.
    3. Highlight additional missed vulnerabilities.
    4. Provide brief reasoning.
    """
    response = llm(prompt, max_tokens=1024)
    return response["choices"][0]["text"]

def perform_scan(file_path: str = None, code: str = None) -> dict:
    if code:
        temp_dir = tempfile.mkdtemp()
        contract_path = os.path.join(temp_dir, "contract.sol")
        with open(contract_path, "w") as f:
            f.write(code)
    elif file_path:
        contract_path = file_path
    else:
        raise HTTPException(status_code=400, detail="No contract code provided.")
    try:
        with open(contract_path, "r") as f:
            solidity_code = f.read()
        solidity_version = extract_solidity_version(solidity_code)
        if not solidity_version:
            raise HTTPException(status_code=400, detail="Could not detect Solidity version.")
        contract_name = extract_contract_name(solidity_code)
        install_solc_version(solidity_version)
        tools_used = ["mythril", "slither"]
        vulnerabilities = []
        vulnerabilities.extend(run_mythril(contract_path))
        vulnerabilities.extend(run_slither(contract_path, solidity_version))
        report = ScanReport(
            solidity_version=solidity_version,
            contract_name=contract_name,
            tools_used=tools_used,
            vulnerabilities=vulnerabilities,
            summary=generate_summary(vulnerabilities)
        )
        # AI verification: verify findings against the contract code
        ai_verification = verify_vulnerabilities(solidity_code, report.dict())
        return {"scanner_results": report.dict(), "ai_verification": ai_verification}
    finally:
        if code and os.path.exists(contract_path):
            os.remove(contract_path)
        if code and os.path.exists(temp_dir):
            os.rmdir(temp_dir)
