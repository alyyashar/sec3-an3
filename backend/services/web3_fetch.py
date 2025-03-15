import requests
import os
from fastapi import HTTPException
import logging

# Load Etherscan API Key from Environment Variables
ETHERSCAN_API_KEY = os.getenv("ETHERSCAN_API_KEY", "9YVU4ARUKCYWA5W4MBDGR98NPKPKRBHQVA")  # Replace with Railway secret later

logger = logging.getLogger(__name__)

ETHERSCAN_API_URL = "https://api.etherscan.io/api"

def fetch_contract_source(contract_address: str) -> str:
    """
    Fetches the Solidity source code of a deployed smart contract from Etherscan.
    
    :param contract_address: Ethereum contract address
    :return: Solidity source code as a string
    """
    params = {
        "module": "contract",
        "action": "getsourcecode",
        "address": contract_address,
        "apikey": ETHERSCAN_API_KEY
    }

    response = requests.get(ETHERSCAN_API_URL, params=params)
    
    if response.status_code != 200:
        raise HTTPException(status_code=500, detail="Etherscan API request failed")

    data = response.json()
    
    if data["status"] != "1" or not data["result"]:
        raise HTTPException(status_code=404, detail="Contract source not found on Etherscan")

    source_code = data["result"][0]["SourceCode"]
    
    if not source_code:
        raise HTTPException(status_code=404, detail="Contract source is empty or unavailable")

    return source_code
