"""
Minimal, dependency-free vector store: loads the pre-built knowledge base
JSON into memory and does brute-force cosine similarity search. Fast enough
for a knowledge base of a few hundred chunks — no faiss/pgvector needed.
"""
from __future__ import annotations

import json
from dataclasses import dataclass

import numpy as np

from app.core.config import settings


@dataclass
class Chunk:
    text: str
    source: str
    embedding: np.ndarray


class VectorStore:
    def __init__(self) -> None:
        self._chunks: list[Chunk] = []
        self._matrix: np.ndarray | None = None
        self._loaded = False

    def load(self) -> None:
        if not settings.INDEX_PATH.exists():
            self._loaded = False
            return

        raw = json.loads(settings.INDEX_PATH.read_text(encoding="utf-8"))
        self._chunks = [
            Chunk(
                text=item["text"],
                source=item["source"],
                embedding=np.array(item["embedding"], dtype=np.float32),
            )
            for item in raw
        ]
        if self._chunks:
            matrix = np.stack([c.embedding for c in self._chunks])
            self._matrix = matrix / np.linalg.norm(matrix, axis=1, keepdims=True)
        self._loaded = True

    @property
    def is_ready(self) -> bool:
        return self._loaded and bool(self._chunks)

    def search(self, query_embedding: list[float], top_k: int = 4) -> list[Chunk]:
        if not self.is_ready or self._matrix is None:
            return []

        query = np.array(query_embedding, dtype=np.float32)
        query = query / np.linalg.norm(query)
        scores = self._matrix @ query
        top_indices = np.argsort(-scores)[:top_k]
        return [self._chunks[i] for i in top_indices]


vector_store = VectorStore()