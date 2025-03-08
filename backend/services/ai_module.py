import json
import os
import requests

# Together AI API Configuration
TOGETHER_API_URL = "https://api.together.xyz/v1/chat/completions"
TOGETHER_API_KEY = "7f73e7ae95aa172946e4b3180f0f4ef89beb9d264cdd273d7040792e267bf1ab"  # Replace with your actual API Key

# Headers for the API request
HEADERS = {
    "Authorization": f"Bearer {TOGETHER_API_KEY}",
    "Content-Type": "application/json"
}

def verify_vulnerabilities(contract_code: str, scanner_results: dict) -> str:
    """
    Uses Llama-3.2-3B-Instruct-Turbo-Free via Together AI for smart contract vulnerability verification.
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

    # Prepare the chat completion payload for Together AI
    payload = {
        "model": "meta-llama/Llama-3.2-3B-Instruct-Turbo-Free",
        "messages": [
            {
                "role": "user",
                "content": prompt
            }
        ],
        # Optional parameters if supported:
        "temperature": 0.7,
        "max_tokens": 100
    }
    
    try:
        response = requests.post(TOGETHER_API_URL, headers=HEADERS, json=payload)
        response.raise_for_status()  # Raise an error if the request fails
        result = response.json()

        # The response should follow the Chat Completion format:
        # {
        #   "id": "...",
        #   "object": "chat.completion",
        #   "created": ...,
        #   "model": "...",
        #   "choices": [
        #       {
        #           "index": 0,
        #           "message": {
        #               "role": "assistant",
        #               "content": "..."
        #           },
        #           "finish_reason": "stop"
        #       }
        #   ],
        #   "usage": {...}
        # }
        return result["choices"][0]["message"]["content"]

    except requests.exceptions.RequestException as e:
        return {"error": str(e)}
