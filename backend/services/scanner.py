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
    """
    Extract Solidity version from a pragma statement, e.g. 'pragma solidity ^0.8.17;'.
    Strips '^', '~', or '>=' to get a clean version like '0.8.17'.
    """
    match = re.search(r"pragma solidity\s+([\^~>=]*\d+\.\d+\.\d+)", code)
    if match:
        version = match.group(1).strip()
        if "^" in version or "~" in version or ">=" in version:
            version = version.replace("^", "").replace("~", "").split(" ")[0]
        logger.info(f"Detected Solidity version: {version}")
        return version
    return None


def install_solc_version_in_container(container: str, version: str):
    """
    Installs and switches to the required Solidity version *inside* the given container
    using 'docker exec <container> solc-select ...'.
    """
    # Check that solc-select is available in the container
    cmd_versions = ["docker", "exec", container, "solc-select", "versions"]
    proc = subprocess.run(cmd_versions, capture_output=True, text=True)
    if proc.returncode != 0:
        raise HTTPException(
            status_code=500,
            detail=f"solc-select not working in container '{container}': {proc.stderr}"
        )

    installed_versions = proc.stdout
    if version not in installed_versions:
        logger.info(f"Installing Solidity {version} in container '{container}'...")
        install_proc = subprocess.run(
            ["docker", "exec", container, "solc-select", "install", version],
            capture_output=True, text=True
        )
        if install_proc.returncode != 0:
            raise HTTPException(
                status_code=500,
                detail=f"Failed installing solc {version} in {container}: {install_proc.stderr}"
            )

    logger.info(f"Switching to Solidity {version} in container '{container}'...")
    use_proc = subprocess.run(
        ["docker", "exec", container, "solc-select", "use", version],
        capture_output=True, text=True
    )
    if use_proc.returncode != 0:
        raise HTTPException(
            status_code=500,
            detail=f"Failed using solc {version} in {container}: {use_proc.stderr}"
        )


def run_mythril(contract_filename: str) -> dict:
    """
    Run Mythril analysis by calling 'docker exec mythril myth analyze /contracts/<file> -o json'.
    Returns the parsed JSON or an error dict.
    """
    cmd = [
        "docker", "exec", "mythril",
        "myth", "analyze", f"/contracts/{contract_filename}", "-o", "json"
    ]
    logger.info("Running Mythril: " + " ".join(cmd))
    proc = subprocess.run(cmd, capture_output=True, text=True)
    if proc.returncode != 0:
        raise HTTPException(
            status_code=500,
            detail=f"Mythril failed: {proc.stderr}"
        )
    try:
        return json.loads(proc.stdout) if proc.stdout else {"error": "No output from Mythril"}
    except json.JSONDecodeError:
        raise HTTPException(
            status_code=500,
            detail="Mythril output is not valid JSON"
        )


def run_slither(contract_filename: str) -> dict:
    """
    Run Slither analysis by calling 'docker exec slither slither /contracts/<file> --json -'.
    Returns the parsed JSON or an error dict.
    """
    cmd = [
        "docker", "exec", "slither",
        "slither", f"/contracts/{contract_filename}", "--json", "-"
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
    Orchestrates the scanning process:
      1) If `code` is provided, writes it to a temp .sol file; else uses file_path.
      2) Extracts the Solidity version from the code.
      3) Installs that solc version in both mythril and slither containers (via solc-select).
      4) Runs Mythril and Slither analyses (docker exec).
      5) Returns combined results.

    The scanning containers (mythril, slither) must each have solc-select installed.
    """
    if code:
        # Pasted code scenario: create a temp file
        temp_dir = tempfile.mkdtemp()
        file_name = "contract.sol"
        contract_full_path = os.path.join(temp_dir, file_name)
        with open(contract_full_path, "w") as f:
            f.write(code)
    elif file_path:
        # File path scenario
        file_name = os.path.basename(file_path)
        contract_full_path = file_path
    else:
        raise HTTPException(status_code=400, detail="No contract code provided.")

    # Extract the Solidity version
    if code:
        solidity_version = extract_solidity_version(code)
    else:
        with open(contract_full_path, "r") as f:
            solidity_code = f.read()
        solidity_version = extract_solidity_version(solidity_code)
    if not solidity_version:
        raise HTTPException(
            status_code=400,
            detail="Could not detect Solidity version."
        )

    # 1) Install solc version in mythril container
    install_solc_version_in_container("mythril", solidity_version)
    # 2) Mythril analysis
    myth_results = run_mythril(file_name)

    # 3) Install solc version in slither container
    install_solc_version_in_container("slither", solidity_version)
    # 4) Slither analysis
    slither_results = run_slither(file_name)

    return {
        "solidity_version": solidity_version,
        "mythril": myth_results,
        "slither": slither_results
    }


def install_solc_version_in_container(container: str, version: str):
    """
    Install & switch to the required Solidity version *inside* the given container.
    """
    # Check solc-select in the container
    cmd_versions = ["docker", "exec", container, "solc-select", "versions"]
    proc = subprocess.run(cmd_versions, capture_output=True, text=True)
    if proc.returncode != 0:
        raise HTTPException(
            status_code=500,
            detail=f"solc-select not working in container '{container}': {proc.stderr}"
        )

    installed_versions = proc.stdout
    if version not in installed_versions:
        logger.info(f"Installing Solidity {version} in container '{container}'...")
        install_proc = subprocess.run(
            ["docker", "exec", container, "solc-select", "install", version],
            capture_output=True, text=True
        )
        if install_proc.returncode != 0:
            raise HTTPException(
                status_code=500,
                detail=f"Failed installing solc {version} in {container}: {install_proc.stderr}"
            )

    logger.info(f"Switching to Solidity {version} in container '{container}'...")
    use_proc = subprocess.run(
        ["docker", "exec", container, "solc-select", "use", version],
        capture_output=True, text=True
    )
    if use_proc.returncode != 0:
        raise HTTPException(
            status_code=500,
            detail=f"Failed using solc {version} in {container}: {use_proc.stderr}"
        )
