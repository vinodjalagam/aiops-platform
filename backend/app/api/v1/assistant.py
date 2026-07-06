from fastapi import APIRouter
from pydantic import BaseModel

from app.ai.assistant_service import AssistantService

router = APIRouter()


class ChatRequest(BaseModel):
    question: str


@router.post("/assistant")
def assistant(request: ChatRequest):
    return AssistantService.ask(request.question)
