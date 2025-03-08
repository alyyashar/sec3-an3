import json
import os
import requests

# Hugging Face API Configuration
HF_API_URL = "https://api-inference.huggingface.co/models/meta-llama/Llama-3.2-3B"
HF_API_KEY = "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"  # Replace with your actual API Key

# Headers for the API request
HEADERS = {
    "Authorization": f"Bearer {HF_API_KEY}",
    "Content-Type": "application/json"
}

def verify_vulnerabilities(contract_code: str, scanner_results: dict) -> str:
    """
    Uses Llama-3.2-3B via Hugging Face Inference API for smart contract vulnerability verification.
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

    payload = {
        "inputs": prompt,
        "parameters": {
            "max_new_tokens": 100,
            "temperature": 0.7
        }
    }
    
    try:
        response = requests.post(HF_API_URL, headers=HEADERS, json=payload)
        response.raise_for_status()  # Raise an error if the request fails
        result = response.json()
        
        # Extract and return the generated text
        return result[0]["generated_text"] if isinstance(result, list) else result

    except requests.exceptions.RequestException as e:
        return {"error": str(e)}
