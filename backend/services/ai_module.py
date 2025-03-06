from transformers import AutoModelForCausalLM, AutoTokenizer
import torch

# Load the Hugging Face model dynamically
MODEL_NAME = "msc-smart-contract-auditing/deepseek-coder-6.7b-vulnerability-detection"

device = "cuda" if torch.cuda.is_available() else "cpu"

# Load the model and tokenizer
tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
model = AutoModelForCausalLM.from_pretrained(MODEL_NAME).to(device)

def verify_vulnerabilities(contract_code: str, scanner_results: dict):
    """
    Uses the AI model to analyze and verify vulnerabilities detected by Slither & Mythril.
    """
    prompt = f"""
    Below is a Solidity smart contract. Review the code and verify if the vulnerabilities detected are valid.

    Contract Code:
    {contract_code}

    Scanner Findings:
    {scanner_results}

    If you find additional vulnerabilities missed by the scanner, list them. Otherwise, confirm the existing results.
    """
    
    inputs = tokenizer(prompt, return_tensors="pt").to(device)
    output = model.generate(**inputs, max_length=1024)
    
    response = tokenizer.decode(output[0], skip_special_tokens=True)
    
    return {"AI_Analysis": response}
