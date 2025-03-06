import json
from llama_cpp import Llama

# Load the Llama Model
MODEL_PATH = "/app/models/llama-3.2-3b.gguf"
llm = Llama(model_path=MODEL_PATH, n_ctx=4096, n_threads=4)

def verify_vulnerabilities(contract_code: str, scanner_results: dict) -> str:
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
    """

    response = llm(prompt, max_tokens=1024)
    return response["choices"][0]["text"]
