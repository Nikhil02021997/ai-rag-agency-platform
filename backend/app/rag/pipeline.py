"""Top-level RAG entrypoint used by the /chat API route."""
from __future__ import annotations

from app.core.config import settings
from app.rag.embedder import embed_text
from app.rag.generator import generate_answer
from app.rag.vector_store import vector_store

FALLBACK_ANSWER = (
    "I'm having trouble reaching my knowledge base right now. "
    "Please try again in a moment, or use the contact form and our team will help directly."
)


def answer_question(question: str, history: list[dict] | None = None) -> dict:
    if not vector_store.is_ready:
        vector_store.load()

    try:
        query_embedding = embed_text(question)
        chunks = vector_store.search(query_embedding, top_k=settings.RAG_TOP_K)
        answer = generate_answer(question, chunks, history=history)
        return {
            "answer": answer,
            "sources": sorted({c.source for c in chunks}),
        }
    except Exception as e:
        print(f"RAG PIPELINE ERROR: {type(e).__name__}: {e}")
        return {"answer": FALLBACK_ANSWER, "sources": []}