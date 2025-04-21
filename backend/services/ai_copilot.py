import os
import json
import re
import logging
from together import Together

logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

def answer_security_query(question: str, contract_data: dict) -> dict:
    """
    - Uses real scan_results JSON from the DB.
    - Only answers about those vulnerabilities.
    - Identity check for "who are you"/"who created you" -> "AN3".
    """
    if not contract_data:
        return {"error": "No contract data provided."}

    ql = question.lower()
    if "who are you" in ql or "who created you" in ql:
        return {"answer": "AN3"}

    # build keyword set
    keywords = set()
    sr = contract_data.get("scanner_results", {})
    for v in sr.get("vulnerabilities", []):
        text = (v.get("issue") or v.get("title") or "").lower()
        keywords.update(text.split())

    ai_ver = contract_data.get("ai_verification", {})
    for section in ("missed_vulnerabilities", "verification"):
        for v in ai_ver.get(section, []):
            text = (v.get("issue") or v.get("title") or "").lower()
            keywords.update(text.split())

    if not any(kw in ql for kw in keywords):
        return {"answer": "I can only answer questions regarding the scanned contract vulnerabilities. Sorry."}

    # craft prompt
    prompt = (
        "You are a smart contract security expert. You have this scan result:\n\n"
        + json.dumps(contract_data, indent=2)
        + "\n\nAnswer briefly, based solely on it:\n"
        + question
        + "\n\nRespond ONLY with the answer, no markdown or extra text."
    )
    logger.debug("Prompt for Copilot:\n%s", prompt)

    api_key = os.getenv("TOGETHER_API_KEY")
    if not api_key:
        return {"error": "TOGETHER_API_KEY environment variable not set."}

    client = Together(api_key=api_key)
    try:
        resp = client.chat.completions.create(
            model="meta-llama/Llama-3.3-70B-Instruct-Turbo-Free",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.7,
            max_tokens=300,
        )
        raw = resp.choices[0].message.content.strip()
        answer = re.sub(r"```(?:json|solidity)?\s*|```", "", raw).strip()
        return {"answer": answer}
    except Exception as e:
        logger.error("AI error: %s", e)
        return {"error": str(e)}
