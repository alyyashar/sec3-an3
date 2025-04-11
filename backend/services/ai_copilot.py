import os
import json
import re
import logging
from together import Together

logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

def answer_security_query(question: str) -> dict:
    """
    Uses Together AI to answer a security query for the Security Copilot.
    """
    prompt = f"""
    You are a smart contract security expert. Answer the following question in a concise, clear manner:
    
    {question}
    
    Respond ONLY with the answer (no extra commentary or markdown formatting).
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
