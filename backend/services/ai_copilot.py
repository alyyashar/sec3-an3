import os
import json
import re
import logging
from together import Together

logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

# Placeholder: In production, replace this with real scanned contract data
SAMPLE_CONTRACT_DATA = {
    "contract_name": "ExampleToken",
    "summary": "ERC20-like token with potential reentrancy vulnerability.",
    "vulnerabilities": [
        "reentrancy in function withdraw()",
        "integer overflow in function addBalance()"
    ]
}

def answer_security_query(question: str, contract_data: dict = None) -> dict:
    """
    Uses Together AI to answer a security query for the Security Copilot.
    - Answers if the question references or relates to known vulnerabilities in contract_data.
    - If user asks identity, returns "I am AN3."
    - Otherwise, says "I can only answer about the scanned contract vulnerabilities. Sorry."
    """
    if contract_data is None:
        contract_data = SAMPLE_CONTRACT_DATA

    # 1) Hard-coded identity check
    norm_q = question.lower()
    if "who are you" in norm_q or "who created you" in norm_q:
        return {"answer": "I am AN3."}

    # 2) Convert known vulnerabilities to a simpler set of keywords
    #    e.g. ["reentrancy", "integer overflow"]
    #    We'll see if the user's question references these keywords
    vulnerability_keywords = []
    for v in contract_data["vulnerabilities"]:
        # Example: "reentrancy in function withdraw()" -> "reentrancy"
        # We'll just pick the first word or so. Or do a more robust approach below:
        keywords = re.findall(r"[a-zA-Z0-9_]+", v.lower())
        vulnerability_keywords.extend(keywords)
    vulnerability_keywords = list(set(vulnerability_keywords))  # unique

    # Quick approach: if user question includes any of these vulnerability words, 
    # treat it as relevant. 
    # e.g. if question = "What is reentrancy?" we see "reentrancy" is in the set => relevant
    relevant = False
    for kw in vulnerability_keywords:
        if kw in norm_q:
            relevant = True
            break

    if not relevant:
        # If the question doesn't reference known vulnerabilities or the contract's name, we refuse
        return {"answer": "I can only answer about the scanned contract vulnerabilities. Sorry."}

    # 3) The question references at least one recognized vulnerability => we let the AI proceed
    #    We embed the entire contract data in the prompt so the AI can be specific if it wants.
    prompt = f"""
You are AN3, an AI specialized in analyzing ONLY the following contract data:

{json.dumps(contract_data, indent=2)}

The user question: "{question}"

Instructions:
1. If user references vulnerabilities present in the contract_data (like reentrancy or overflow),
   answer concisely and specifically about the contract or the relevant vulnerability.
2. Respond ONLY with your final text. No markdown. No extra commentary.
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

# For a quick test
if __name__ == '__main__':
    print(answer_security_query("What is reentrancy?"))
    print(answer_security_query("Who created you?"))
    print(answer_security_query("Are you a stable diffused AI?"))
    print(answer_security_query("What about integer overflow?"))
