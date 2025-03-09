import os
import json
import logging
from together import Together

# Configure logging
logging.basicConfig(
    level=logging.DEBUG,
    format="%(asctime)s [%(levelname)s] %(message)s"
)

def verify_vulnerabilities(contract_code: str, scanner_results: dict) -> dict:
    """
    Uses Together AI's chat completion API with Llama-3.3-70B-Instruct-Turbo-Free
    to verify smart contract vulnerability findings.
    """
    logging.debug("Starting verify_vulnerabilities function.")

    # Construct chat prompt
    prompt = f"""
    You are a Solidity security expert. Given the contract code below:
    
    {contract_code}
    
    And the following vulnerability findings:
    {json.dumps(scanner_results, indent=2)}
    
    Tasks:
    1. Verify if each reported issue is valid.
    2. Identify false positives.
    3. Highlight additional missed vulnerabilities.
    4. Provide reasoning in structured JSON format.
    """
    logging.debug(f"Constructed prompt:\n{prompt}")

    # Prepare chat messages
    messages = [{"role": "user", "content": prompt}]
    logging.debug(f"Prepared chat messages: {messages}")

    # Read API key from environment
    together_api_key = os.getenv("TOGETHER_API_KEY")
    if not together_api_key:
        logging.error("TOGETHER_API_KEY environment variable not set.")
        return {"error": "TOGETHER_API_KEY environment variable not set."}
    
    logging.debug("Initializing Together client...")
    client = Together(api_key=together_api_key)

    try:
        # Create a chat completion request
        logging.debug("Sending request to Together API...")
        response = client.chat.completions.create(
            model="meta-llama/Llama-3.3-70B-Instruct-Turbo-Free",
            messages=messages,
            temperature=0.7,
            max_tokens=500
        )
        
        # Extract text response
        raw_text = response.choices[0].message.content
        logging.debug(f"Raw generated text: {raw_text}")

        # Convert to JSON
        parsed_output = json.loads(raw_text)
        return parsed_output

    except json.JSONDecodeError as e:
        logging.error(f"JSON parsing error: {e}")
        return {"error": "Failed to parse JSON response from AI"}

    except Exception as e:
        logging.error(f"Error during verify_vulnerabilities: {e}")
        return {"error": str(e)}
