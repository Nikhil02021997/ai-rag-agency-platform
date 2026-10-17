from fastapi import APIRouter

from app.rag.pipeline import answer_question
from app.schemas.chat import ChatRequest, ChatResponse

router = APIRouter(
    prefix="/chat",
    tags=["Chat"],
)


@router.post("", response_model=ChatResponse)
def chat(request: ChatRequest) -> ChatResponse:
    history = [m.model_dump() for m in request.history]
    result = answer_question(request.message, history=history)
    return ChatResponse(**result)