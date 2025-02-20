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
    match = re.search(r"pragma solidity\s+([\^~>=]*\d+\.\d+\.\d+)", code)
    if match:
        version = match.group(1).strip()
        if "^" in version or "~" in version or ">=" in version:
            version = version.replace("^", "").replace("~", "").split(" ")[0]
        logger.info(f"Detected Solidity version: {version}")
        return version
    return None

def install_solc_version(version: str):
    """
    Installs & switches to the required Solidity version using solc-select.
    """
    try:
        subprocess.run(["solc-select", "versions"], capture_output=True, text=True, check=True)
    except subprocess.CalledProcessError:
        raise HTTPException(status_code=500, detail="solc-select is not working properly.")

    installed_versions = subprocess.run(["solc-select", "versions"], capture_output=True, text=True).stdout
    logger.info(f"Installed Solidity versions: {installed_versions}")

    if version not in installed_versions:
        logger.info(f"Installing Solidity {version}...")
        install_proc = subprocess.run(["solc-select", "install", version], capture_output=True, text=True)
        if install_proc.returncode != 0:
            raise HTTPException(
                status_code=500,
                detail=f"Failed installing solc {version}: {install_proc.stderr}"
            )
    logger.info(f"Switching to Solidity {version}...")
    use_proc = subprocess.run(["solc-select", "use", version], capture_output=True, text=True)
    if use_proc.returncode != 0:
        raise HTTPException(
            status_code=500,
            detail=f"Failed switching to solc {version}: {use_proc.stderr}"
        )

def run_mythril(contract_path: str) -> dict:
    """
    Locally run Mythril with solc args for node_modules. e.g.:
      myth analyze contract.sol -o json --solc-args "--base-path . --include-path node_modules"
    """
    cmd = [
        "myth", "analyze", contract_path,
        "-o", "json",
        "--solc-args", "--base-path . --include-path node_modules"
    ]
    logger.info("Running Mythril: " + " ".join(cmd))
    proc = subprocess.run(cmd, capture_output=True, text=True)
    if proc.returncode != 0:
        raise HTTPException(status_code=500, detail=f"Mythril failed: {proc.stderr}")
    try:
        return json.loads(proc.stdout) if proc.stdout else {"error": "No output from Mythril"}
    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Mythril output is not valid JSON")

def run_slither(contract_path: str) -> dict:
    """
    Locally run Slither with:
      slither contract.sol --json - --solc-remaps @openzeppelin=node_modules/@openzeppelin --solc-args "--base-path . --include-path node_modules"
    """
    cmd = [
        "slither", contract_path,
        "--json", "-",
        "--solc-remaps", "@openzeppelin=node_modules/@openzeppelin",
        "--solc-args", "--base-path . --include-path node_modules"
    ]
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
    1) If code is provided, writes it to a temp file, else uses file_path.
    2) Extracts Solidity version & uses solc-select to install/use that version.
    3) Runs Mythril & Slither with correct solc arguments for node_modules.
    """
    if code:
        temp_dir = tempfile.mkdtemp()
        file_name = "contract.sol"
        contract_path = os.path.join(temp_dir, file_name)
        with open(contract_path, "w") as f:
            f.write(code)
    elif file_path:
        file_name = os.path.basename(file_path)
        contract_path = file_path
    else:
        raise HTTPException(status_code=400, detail="No contract code provided.")

    if code:
        solidity_version = extract_solidity_version(code)
    else:
        with open(contract_path, "r") as f:
            solidity_code = f.read()
        solidity_version = extract_solidity_version(solidity_code)

    if not solidity_version:
        raise HTTPException(status_code=400, detail="Could not detect Solidity version.")

    # Install & switch to correct solc version
    install_solc_version(solidity_version)

    # Run Mythril & Slither
    myth_results = run_mythril(contract_path)
    slither_results = run_slither(contract_path)

    return {
        "solidity_version": solidity_version,
        "mythril": myth_results,
        "slither": slither_results
    }
