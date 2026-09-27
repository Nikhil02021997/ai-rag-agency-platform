"""
Thin wrapper around Ollama's embeddings endpoint.
Free + local: no API keys, no per-request billing, runs entirely on your own server.
"""
from __future__ import annotations

import httpx

from app.core.config import settings


def embed_text(text: str) -> list[float]:
    """Return an embedding vector for a single piece of text."""
    response = httpx.post(
        f"{settings.OLLAMA_BASE_URL}/api/embeddings",
        json={"model": settings.OLLAMA_EMBED_MODEL, "prompt": text},
        timeout=60.0,
    )
    response.raise_for_status()
    return response.json()["embedding"]


def embed_batch(texts: list[str]) -> list[list[float]]:
    """Embed multiple texts. Ollama's embeddings endpoint takes one prompt at a
    time, so we loop — fine for the small knowledge bases this project uses."""
    return [embed_text(t) for t in texts]