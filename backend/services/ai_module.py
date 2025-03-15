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
    Uses Together AI to verify smart contract vulnerability findings.
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

    Respond **ONLY** with a **valid JSON object**, without explanations, markdown, or additional text.
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
            max_tokens=700  # Increased to handle full JSON response
        )
        
        # Extract raw text response
        raw_text = response.choices[0].message.content.strip()
        logging.debug(f"Raw generated text: {raw_text}")

        # Step 1: Remove Markdown-style formatting (```json ... ```)
        json_text = re.sub(r"```json\n?|```", "", raw_text).strip()

        # Step 2: Fix potential extra `{` at the start
        json_text = re.sub(r"^\{+\s*", "{", json_text)  # Replace multiple `{` with a single `{`

        # Step 3: Handle invalid trailing commas (common AI mistake)
        json_text = re.sub(r",\s*([\]})])", r"\1", json_text)  # Remove trailing commas

        # Step 4: Ensure JSON is correctly formatted
        try:
            parsed_output = json.loads(json_text)
            return parsed_output
        except json.JSONDecodeError as e:
            logging.error(f"JSON parsing error, AI response:\n{json_text}")
            return {"error": "Failed to parse JSON response from AI", "raw_text": json_text}

    except Exception as e:
        logging.error(f"Error during verify_vulnerabilities: {e}")
        return {"error": str(e)}

def generate_fix(vulnerability: str, affected_code: str, full_contract: str) -> str:
    """
    Uses Together AI to generate a secure fix for a detected vulnerability.
    """
    logging.debug("Starting generate_fix function.")

    # Construct chat prompt
    prompt = f"""
    You are a Solidity security expert. The following smart contract has a vulnerability:
    
    Vulnerability Type: {vulnerability}
    
    Affected Code:
    ```solidity
    {affected_code}
    ```
    
    Full Contract Code:
    ```solidity
    {full_contract}
    ```
    
    Please provide a fixed version of the affected code snippet while preserving functionality.
    """
    logging.debug(f"Constructed prompt:\n{prompt}")

    # Prepare chat messages
    messages = [{"role": "user", "content": prompt}]
    logging.debug(f"Prepared chat messages: {messages}")

    # Read API key from environment
    together_api_key = os.getenv("TOGETHER_API_KEY")
    if not together_api_key:
        logging.error("TOGETHER_API_KEY environment variable not set.")
        return "Error: TOGETHER_API_KEY not set."

    logging.debug("Initializing Together client...")
    client = Together(api_key=together_api_key)

    try:
        # Create a chat completion request
        logging.debug("Sending request to Together API for code fix...")
        response = client.chat.completions.create(
            model="meta-llama/Llama-3.3-70B-Instruct-Turbo-Free",
            messages=messages,
            temperature=0.5,
            max_tokens=300
        )

        # Extract fixed code
        fixed_code = response.choices[0].message.content
        logging.debug(f"Generated fixed code: {fixed_code}")

        return fixed_code.strip()

    except Exception as e:
        logging.error(f"Error during generate_fix: {e}")
        return f"Error generating fix: {str(e)}"
