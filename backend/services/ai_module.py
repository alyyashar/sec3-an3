import json
import os
from huggingface_hub import InferenceClient

# Hugging Face API Key
HF_API_KEY = "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"  # Replace with your actual API Key

# Create Inference Client
client = InferenceClient(
    provider="novita",
    api_key=HF_API_KEY
)

def verify_vulnerabilities(contract_code: str, scanner_results: dict) -> str:
    """
    Uses DeepSeek-V3 via Hugging Face Inference API for smart contract vulnerability verification.
    """
    messages = [
        {
            "role": "user",
            "content": f"""
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
        }
    ]
    
    try:
        completion = client.chat.completions.create(
            model="deepseek-ai/DeepSeek-V3",
            messages=messages,
            max_tokens=500
        )
        return completion.choices[0].message["content"]
    
    except Exception as e:
        return {"error": str(e)}
