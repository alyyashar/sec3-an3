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
    try:
        subprocess.run(["solc-select", "versions"], check=True, capture_output=True, text=True)
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
    Mythril invocation includes:
      --allow-paths .
      --solc-args "--base-path . --include-path node_modules"
    """
    abs_path = os.path.abspath(contract_path)
    cmd = [
        "myth", "analyze", abs_path,
        "-o", "json",
        "--allow-paths", ".",
        "--solc-args", "--base-path . --include-path node_modules"
    ]
    logger.info("Running Mythril: " + " ".join(cmd))
    proc = subprocess.run(cmd, capture_output=True, text=True)
    if proc.returncode != 0:
        # Mythril error => raise 500 so the user can see the message
        raise HTTPException(status_code=500, detail=f"Mythril failed: {proc.stderr}")
    try:
        return json.loads(proc.stdout) if proc.stdout else {"error": "No output from Mythril"}
    except json.JSONDecodeError:
        raise HTTPException(
            status_code=500,
            detail="Mythril output is not valid JSON. Possibly solc returned an error."
        )


def run_slither(contract_path: str) -> dict:
    """
    Slither invocation includes:
      --solc-remaps "@openzeppelin=node_modules/@openzeppelin"
      --solc-args "--base-path . --include-path node_modules"
      --allow-paths .
    """
    abs_path = os.path.abspath(contract_path)
    cmd = [
        "slither", abs_path,
        "--json", "-",
        "--solc-remaps", "@openzeppelin=node_modules/@openzeppelin",
        "--solc-args", "--base-path . --include-path node_modules",
        "--allow-paths", "."
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
    if code:
        # create a temp dir, write code as contract.sol
        temp_dir = tempfile.mkdtemp()
        contract_path = os.path.join(temp_dir, "contract.sol")
        with open(contract_path, "w") as f:
            f.write(code)
    elif file_path:
        contract_path = file_path
    else:
        raise HTTPException(status_code=400, detail="No contract code provided.")

    # Detect version
    if code:
        solidity_version = extract_solidity_version(code)
    else:
        with open(contract_path, "r") as f:
            solidity_code = f.read()
        solidity_version = extract_solidity_version(solidity_code)

    if not solidity_version:
        raise HTTPException(status_code=400, detail="Could not detect Solidity version.")

    # Install and switch to that version
    install_solc_version(solidity_version)

    # Run Mythril & Slither
    myth_results = run_mythril(contract_path)
    slither_results = run_slither(contract_path)

    return {
        "solidity_version": solidity_version,
        "mythril": myth_results,
        "slither": slither_results
    }
