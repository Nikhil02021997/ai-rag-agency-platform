"""
Minimal, dependency-free retriever: loads the pre-built knowledge base JSON into
memory and ranks chunks with a blend of cosine similarity (semantic) and keyword
overlap (exact words like "SEO", "WhatsApp", "ROAS"). Works with keywords alone if
the embedding service is unavailable.
"""
from __future__ import annotations

import json
import re
from dataclasses import dataclass

import numpy as np

from app.core.config import settings

_STOP = {
    "the", "a", "an", "and", "or", "of", "to", "for", "in", "on", "is", "are", "do", "does",
    "you", "your", "we", "i", "me", "my", "can", "what", "how", "about", "with", "it", "this",
    "that", "at", "be", "have", "has", "from", "as", "by", "us", "our", "any", "there",
}


# query words -> words used in the knowledge base
_SYNONYMS = {
    "price": "pricing", "prices": "pricing", "cost": "pricing", "costs": "pricing", "much": "pricing",
    "charge": "pricing", "fee": "pricing", "fees": "pricing", "rate": "pricing", "rates": "pricing",
    "quote": "pricing", "budget": "pricing", "chatbot": "rag", "chatbots": "rag", "bot": "rag",
    "ai": "rag", "website": "web", "websites": "web", "site": "web", "ads": "ads", "ppc": "ads",
    "facebook": "meta", "instagram": "meta", "google": "google", "location": "based", "where": "based",
    "founder": "founded", "owner": "founded", "ceo": "founded", "steps": "process", "workflow": "process",
}


def _stem(t: str) -> str:
    for suffix in ("ing", "es", "s"):
        if t.endswith(suffix) and len(t) - len(suffix) >= 4:
            return t[: -len(suffix)]
    return t


def _tokens(text: str) -> set[str]:
    out = set()
    for t in re.findall(r"[a-z0-9]+", text.lower()):
        if t in _STOP or len(t) < 2:
            continue
        out.add(_stem(_SYNONYMS.get(t, t)))
    return out


@dataclass
class Chunk:
    text: str
    source: str
    embedding: np.ndarray | None
    tokens: set[str]


class VectorStore:
    def __init__(self) -> None:
        self._chunks: list[Chunk] = []
        self._matrix: np.ndarray | None = None
        self._loaded = False

    def load(self) -> None:
        self._chunks, self._matrix, self._loaded = [], None, False
        if not settings.INDEX_PATH.exists():
            return

        raw = json.loads(settings.INDEX_PATH.read_text(encoding="utf-8"))
        for item in raw:
            emb = item.get("embedding")
            self._chunks.append(
                Chunk(
                    text=item["text"],
                    source=item["source"],
                    embedding=np.array(emb, dtype=np.float32) if emb else None,
                    tokens=_tokens(item["text"]),
                )
            )
        if self._chunks and all(c.embedding is not None for c in self._chunks):
            matrix = np.stack([c.embedding for c in self._chunks])
            self._matrix = matrix / np.linalg.norm(matrix, axis=1, keepdims=True)
        self._loaded = True

    @property
    def is_ready(self) -> bool:
        return self._loaded and bool(self._chunks)

    def search(
        self, query: str, query_embedding: list[float] | None = None, top_k: int = 5
    ) -> list[Chunk]:
        if not self.is_ready:
            return []

        q_tokens = _tokens(query)
        keyword = np.array(
            [len(q_tokens & c.tokens) / (len(q_tokens) or 1) for c in self._chunks], dtype=np.float32
        )

        if query_embedding is not None and self._matrix is not None:
            q = np.array(query_embedding, dtype=np.float32)
            q = q / np.linalg.norm(q)
            semantic = self._matrix @ q
            scores = 0.7 * semantic + 0.3 * keyword
        else:
            scores = keyword

        top = np.argsort(-scores)[:top_k]
        return [self._chunks[i] for i in top]


vector_store = VectorStore()
