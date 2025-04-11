from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from services.ai_copilot import answer_security_query

router = APIRouter()

class CopilotQuery(BaseModel):
    question: str

@router.post("/")
async def get_copilot_answer(query: CopilotQuery):
    result = answer_security_query(query.question)
    if "error" in result:
        raise HTTPException(status_code=500, detail=result["error"])
    return result
