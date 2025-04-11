import os
import json
import re
import logging
from together import Together

logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

# Placeholder: In production, supply the actual scanned contract data
SAMPLE_CONTRACT_DATA = {
    "contract_name": "ExampleToken",
    "summary": "ERC20-like token with potential reentrancy vulnerability.",
    "vulnerabilities": [
        "Reentrancy in function withdraw()",
        "Integer overflow in function addBalance()"
    ]
}

def answer_security_query(question: str, contract_data: dict = None) -> dict:
    """
    Uses Together AI to answer a security query for the Security Copilot.
    
    - Only answers questions related to the scanned contract.
    - If the question is out of scope, responds with:
      "I can only answer about the scanned contract vulnerabilities. Sorry."
    - Responds with "I am AN3." if the user asks about its identity.
    """
    
    # Use provided contract_data or fall back to the sample
    if contract_data is None:
        contract_data = SAMPLE_CONTRACT_DATA

    # 1) Check for identity questions
    let_question = question.lower()
    if "who are you" in let_question or "who created you" in let_question:
        return {"answer": "I am AN3."}

    # 2) Create prompt with strict instructions:
    prompt = f"""
You are AN3, an AI specialized in smart contract security. 
Below is the scanned contract information:
    
{json.dumps(contract_data, indent=2)}

Answer ONLY questions about the scanned contract vulnerabilities. 
If the user's question is not directly relevant to this contract data, 
respond with: "I can only answer about the scanned contract vulnerabilities. Sorry."
    
User question: "{question}"

Respond ONLY with the final answer with no markdown formatting.
"""

    logger.debug(f"Constructed Security Copilot prompt:\n{prompt}")

    messages = [{"role": "user", "content": prompt}]
    logger.debug(f"Prepared chat messages: {messages}")

    together_api_key = os.getenv("TOGETHER_API_KEY")
    if not together_api_key:
        logger.error("TOGETHER_API_KEY environment variable not set.")
        return {"error": "TOGETHER_API_KEY environment variable not set."}
    
    client = Together(api_key=together_api_key)

    try:
        response = client.chat.completions.create(
            model="meta-llama/Llama-3.3-70B-Instruct-Turbo-Free",
            messages=messages,
            temperature=0.7,
            max_tokens=300
        )
        raw_text = response.choices[0].message.content.strip()

        # Clean up any markdown formatting
        answer = re.sub(r"```(?:json|solidity)?\s*|```", "", raw_text).strip()
        logger.debug(f"Security Copilot response: {answer}")
        return {"answer": answer}

    except Exception as e:
        logger.error(f"Error during answer_security_query: {e}")
        return {"error": str(e)}

# For testing purposes, you can call this function directly:
if __name__ == '__main__':
    sample_question = "What is a reentrancy vulnerability and how can it affect this contract?"
    result = answer_security_query(sample_question)
    print(result)
