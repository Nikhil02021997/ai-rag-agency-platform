"""Calls Ollama's chat endpoint to turn retrieved context + a question into an answer."""
from __future__ import annotations

import httpx

from app.core.config import settings
from app.rag.prompts import SYSTEM_PROMPT, build_context

MAX_HISTORY_MESSAGES = 8  # keep the last N turns, oldest dropped first


def generate_answer(question: str, chunks, history: list[dict] | None = None) -> str:
    system_prompt = SYSTEM_PROMPT.format(context=build_context(chunks))

    messages = [{"role": "system", "content": system_prompt}]

    if history:
        for turn in history[-MAX_HISTORY_MESSAGES:]:
            role = turn.get("role")
            content = turn.get("content")
            if role in ("user", "assistant") and content:
                messages.append({"role": role, "content": content})

    messages.append({"role": "user", "content": question})

    response = httpx.post(
        f"{settings.OLLAMA_BASE_URL}/api/chat",
        json={
            "model": settings.OLLAMA_CHAT_MODEL,
            "messages": messages,
            "stream": False,
        },
        timeout=60.0,
    )
    response.raise_for_status()
    return response.json()["message"]["content"].strip()