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

    # Read your Together API key from the environment (Railway)
    together_api_key = os.getenv("TOGETHER_API_KEY")
    if not together_api_key:
        logging.error("TOGETHER_API_KEY environment variable not set. Ensure it is configured in Railway.")
        return "Error: TOGETHER_API_KEY environment variable not set."
    logging.debug(f"Read Together API key from environment: {together_api_key}")

    # Initialize the Together client
    client = Together()
    client.api_key = together_api_key
    logging.debug("Initialized Together client and set the API key.")

    try:
        # Create a completion request using the legacy completions API
        logging.debug("Creating completion request...")
        response = client.completions.create(
            model="meta-llama/Llama-3.2-3B-Instruct-Turbo-Free",
            prompt=prompt,
            temperature=0.7,
            max_tokens=100,
        )
        logging.debug(f"Response received: {response}")

        # Extract and return the generated text
        generated_text = response.choices[0].text
        logging.debug(f"Final generated text: {generated_text}")
        return generated_text

    except Exception as e:
        logging.error(f"Error during verify_vulnerabilities: {e}", exc_info=True)
        return f"Error: {str(e)}"
