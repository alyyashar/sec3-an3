import json
from together import Together

def verify_vulnerabilities(contract_code: str, scanner_results: dict) -> str:
    """
    Uses Llama-3.2-3B-Instruct-Turbo-Free via the Together Python library
    for smart contract vulnerability verification.
    """
    # Construct your prompt
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

    # Prepare your chat messages
    messages = [
        {"role": "user", "content": prompt}
    ]

    # Provide your Together API key here
    together_api_key = "7f73e7ae95aa172946e4b3180f0f4ef89beb9d264cdd273d7040792e267bf1ab"

    # Initialize the Together client with your API key
    with Together(api_key=together_api_key) as client:
        # Create a streaming chat completion
        stream = client.chat.completions.create(
            model="meta-llama/Llama-3.2-3B-Instruct-Turbo-Free",
            messages=messages,
            temperature=0.7,
            max_tokens=100,
            stream=True
        )

        # Collect the chunks from the streaming response
        response_text = ""
        for chunk in stream:
            delta_content = chunk.choices[0].delta.get("content", "")
            response_text += delta_content

    # Return the final assembled response
    return response_text
