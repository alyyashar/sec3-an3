from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from services.ai_copilot import answer_security_query

router = APIRouter()

class CopilotQuery(BaseModel):
    question: str

@router.post("")
async def get_copilot_answer(query: CopilotQuery):
    # Suppose you retrieve the relevant contract_data from the DB 
    # based on whichever contract the user is looking at. 
    # For demo, we just do:
    contract_data = {
        "contract_name": "MyDeFiContract",
        "summary": "A contract dealing with user deposits, potentially susceptible to reentrancy.",
        "vulnerabilities": ["Reentrancy in 'withdrawFunds'", "Integer overflow in 'increaseBalance'"]
    }

    result = answer_security_query(query.question, contract_data)
    if "error" in result:
        raise HTTPException(status_code=500, detail=result["error"])
    return result
