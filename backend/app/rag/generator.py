"""Calls Ollama's chat endpoint to turn retrieved context + a question into an answer."""
from __future__ import annotations

import httpx

from app.core.config import settings
from app.rag.prompts import build_system_prompt

MAX_HISTORY_MESSAGES = 8  # keep the last N turns, oldest dropped first


def generate_answer(question: str, chunks, history: list[dict] | None = None) -> str:
    system_prompt = build_system_prompt(chunks)

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
            "keep_alive": "30m",  # keep the model loaded so replies aren't slow after idle
            "options": {"temperature": 0.2, "num_ctx": 4096},
        },
        timeout=180.0,  # first request after idle can take a while to load the model
    )
    response.raise_for_status()
    return response.json()["message"]["content"].strip()