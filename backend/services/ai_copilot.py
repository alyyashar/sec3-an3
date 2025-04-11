import os
import json
import re
import logging
from together import Together

logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

def answer_security_query(question: str, contract_data: dict) -> dict:
    """
    Uses Together AI to answer a security query for the Security Copilot.
    - Answers questions specifically about the scanned contract's vulnerabilities.
    - If the user asks "who are you" or "who created you", returns "AN3".
    - If the question does not seem to be related to the scan results, responds with an out-of-scope message.
    - Requires real contract scan data (contract_data) to be provided.
    """
    if not contract_data:
        return {"error": "No contract data provided."}
    
    # Identity check:
    const_question = question.lower()
    if "who are you" in const_question or "who created you" in const_question:
        return {"answer": "AN3"}

    # Gather vulnerability keywords from the scan results.
    vulnerability_keywords = set()
    
    # Extract keywords from vulnerabilities in the scanner_results
    scanner_results = contract_data.get("scanner_results", {})
    vulns = scanner_results.get("vulnerabilities", [])
    for vuln in vulns:
        # Use the issue/title text to extract words
        text = (vuln.get("issue") or vuln.get("title") or "").lower()
        vulnerability_keywords.update(text.split())
    
    # Extract keywords from missed vulnerabilities in the ai_verification section, if present.
    ai_verif = contract_data.get("ai_verification", {})
    # Try both common patterns: as an array in "missed_vulnerabilities" or inside "verification"
    if isinstance(ai_verif.get("missed_vulnerabilities"), list):
        for vuln in ai_verif["missed_vulnerabilities"]:
            text = (vuln.get("issue") or vuln.get("title") or "").lower()
            vulnerability_keywords.update(text.split())
    elif isinstance(ai_verif.get("verification"), list):
        # In some responses, vulnerabilities could appear as a list in the 'verification' key.
        for vuln in ai_verif["verification"]:
            text = (vuln.get("issue") or vuln.get("title") or "").lower()
            vulnerability_keywords.update(text.split())
    
    # Check if the user's question references any of the known keywords.
    const_question = question.lower()
    relevant = any(kw in const_question for kw in vulnerability_keywords)
    
    if not relevant:
        return {"answer": "I can only answer questions regarding the scanned contract vulnerabilities. Sorry."}
    
    # Construct a prompt including the real contract scan results.
    prompt = (
        "You are a smart contract security expert. You have been provided with the following scan results:\n\n"
        + json.dumps(contract_data, indent=2)
        + "\n\nAnswer the following question concisely and based on the scan results:\n"
        + question
        + "\n\nRespond ONLY with the answer, without any additional commentary or markdown formatting."
    )
    
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
        
        # Clean up markdown formatting, if any.
        answer = re.sub(r"```(?:json|solidity)?\s*|```", "", raw_text).strip()
        logger.debug(f"Security Copilot response: {answer}")
        return {"answer": answer}
    except Exception as e:
        logger.error(f"Error during answer_security_query: {e}")
        return {"error": str(e)}

# For quick local testing (remove or comment out in production)
if __name__ == '__main__':
    # Expect real data to be passed; this should fail since we don't have it.
    print(answer_security_query("What is reentrancy?", {}))
