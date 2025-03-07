
import json
import requests
import os

# Hugging Face API Endpoint
HF_API_URL = "https://api-inference.huggingface.co/models/msc-smart-contract-auditing/deepseek-coder-6.7b-vulnerability-detection"

# Ensure the API key is correctly fetched
HF_API_KEY = os.getenv("HF_API_KEY")  # Load from environment variables

if not HF_API_KEY:
    raise ValueError("Hugging Face API key is missing! Set HF_API_KEY as an environment variable.")

# Headers for the API request
HEADERS = {"Authorization": f"Bearer {HF_API_KEY}"}

def verify_vulnerabilities(contract_code: str, scanner_results: dict) -> str:
    """
    Sends the smart contract and scanner results to Hugging Face for AI verification.
    """
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
    
    Output findings in a structured JSON format.
    """
    
    payload = {"inputs": prompt}
    
    try:
        response = requests.post(HF_API_URL, headers=HEADERS, json=payload)
        response.raise_for_status()  # Raise error if request fails
        return response.json()  # Return AI-generated vulnerability report
    except requests.exceptions.RequestException as e:
        return {"error": str(e)}
