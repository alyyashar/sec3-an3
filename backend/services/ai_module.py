import os
import json
import logging
from together import Together

# Configure logging to show debug-level messages
logging.basicConfig(
    level=logging.DEBUG,
    format="%(asctime)s [%(levelname)s] %(message)s"
)

def verify_vulnerabilities(contract_code: str, scanner_results: dict) -> str:
    """
    Uses Llama-3.2-3B-Instruct-Turbo-Free via the Together Python library
    for smart contract vulnerability verification.
    """

    logging.debug("Starting verify_vulnerabilities function.")

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
    logging.debug(f"Constructed prompt:\n{prompt}")

    # Prepare your chat messages
    messages = [{"role": "user", "content": prompt}]
    logging.debug(f"Prepared chat messages: {messages}")

    # Read your Together API key from the environment (Railway)
    together_api_key = os.getenv("TOGETHER_API_KEY")
    logging.debug(f"Read Together API key from environment: {together_api_key or 'None'}")

    # Initialize the Together client
    client = Together()
    client.api_key = together_api_key
    logging.debug("Initialized Together client and set the API key.")

    try:
        # Create a streaming chat completion
        logging.debug("Creating streaming chat completion request...")
        stream = client.chat.completions.create(
            model="meta-llama/Llama-3.2-3B-Instruct-Turbo-Free",
            messages=messages,
            temperature=0.7,
            max_tokens=100,
            stream=True
        )

        # Collect the chunks from the streaming response
        response_text = ""
        logging.debug("Collecting response chunks from the streaming response...")
        for chunk in stream:
            delta_content = chunk.choices[0].delta.get("content", "")
            response_text += delta_content

        logging.debug(f"Final response text collected: {response_text}")
        return response_text

    except Exception as e:
        logging.error(f"Error during verify_vulnerabilities: {e}", exc_info=True)
        return f"Error: {str(e)}"
