import subprocess
import json
import re
import logging
import tempfile
import os
from fastapi import HTTPException

logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

def extract_solidity_version(code: str) -> str:
    """Extract Solidity version from the pragma statement."""
    match = re.search(r"pragma solidity\s+([\^~>=]*\d+\.\d+\.\d+)", code)
    if match:
        version = match.group(1).strip()
        logger.info(f"Detected Solidity version: {version}")
        if "^" in version or "~" in version or ">=" in version:
            version = version.replace("^", "").replace("~", "").split(" ")[0]
        return version
    return None

def ensure_solc_select():
    """Ensure that solc-select is working."""
    try:
        subprocess.run(["solc-select", "versions"], capture_output=True, text=True, check=True)
    except subprocess.CalledProcessError:
        raise HTTPException(status_code=500, detail="solc-select is not working properly.")

def install_solc_version(version: str):
    """Install and switch to the required Solidity version."""
    ensure_solc_select()
    installed_versions = subprocess.run(["solc-select", "versions"], capture_output=True, text=True).stdout
    logger.info(f"Installed Solidity versions: {installed_versions}")
    if version not in installed_versions:
        logger.info(f"Installing Solidity {version}...")
        subprocess.run(["solc-select", "install", version], check=True)
    logger.info(f"Switching to Solidity {version}...")
    subprocess.run(["solc-select", "use", version], check=True)

def run_mythril(contract_filename: str) -> dict:
    """Run Mythril analysis by calling docker exec on the mythril container."""
    cmd = ["docker", "exec", "mythril", "myth", "analyze", f"/contracts/{contract_filename}", "-o", "json"]
    logger.info("Running Mythril: " + " ".join(cmd))
    proc = subprocess.run(cmd, capture_output=True, text=True)
    if proc.returncode != 0:
        raise HTTPException(status_code=500, detail=f"Mythril failed: {proc.stderr}")
    try:
        return json.loads(proc.stdout) if proc.stdout else {"error": "No output from Mythril"}
    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Mythril output is not valid JSON")

def run_slither(contract_filename: str) -> dict:
    """Run Slither analysis by calling docker exec on the slither container."""
    cmd = ["docker", "exec", "slither", "slither", f"/contracts/{contract_filename}", "--json", "-"]
    logger.info("Running Slither: " + " ".join(cmd))
    proc = subprocess.run(cmd, capture_output=True, text=True)
    if proc.returncode != 0:
        logger.error(f"Slither failed: {proc.stderr}")
        return {"error": proc.stderr}
    try:
        return json.loads(proc.stdout) if proc.stdout else {"error": "No output from Slither"}
    except json.JSONDecodeError:
        return {"error": "Slither output is not valid JSON"}

def perform_scan(file_path: str = None, code: str = None) -> dict:
    """
    Core scanning function.
    - If `code` (pasted input) is provided, it saves it as a temporary file.
    - Otherwise, it uses the file_path.
    - It extracts the Solidity version, installs that solc version,
      and calls Mythril and Slither via docker exec.
    """
    if code:
        temp_dir = tempfile.mkdtemp()
        file_name = "contract.sol"
        contract_full_path = os.path.join(temp_dir, file_name)
        with open(contract_full_path, "w") as f:
            f.write(code)
    elif file_path:
        file_name = os.path.basename(file_path)
        contract_full_path = file_path
    else:
        raise HTTPException(status_code=400, detail="No contract code provided.")

    # Extract Solidity version from the code (if available) or from file content
    if code:
        solidity_version = extract_solidity_version(code)
    else:
        with open(contract_full_path, "r") as f:
            solidity_code = f.read()
        solidity_version = extract_solidity_version(solidity_code)
    if not solidity_version:
        raise HTTPException(status_code=400, detail="Could not detect Solidity version.")

    # Install and switch to the required solc version
    install_solc_version(solidity_version)

    # Run both scanners (they expect the contract file to be in the shared contracts volume)
    myth_results = run_mythril(file_name)
    slither_results = run_slither(file_name)

    return {
        "solidity_version": solidity_version,
        "mythril": myth_results,
        "slither": slither_results
    }
