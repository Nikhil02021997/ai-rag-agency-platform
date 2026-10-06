"""Top-level RAG entrypoint used by the /chat API route."""
from __future__ import annotations

from app.core.config import settings
from app.core.contact_info import CONTACT_INTENT_RE, contact_answer, sanitize
from app.core.quick_answers import quick_answer
from app.rag.embedder import embed_text
from app.rag.generator import generate_answer
from app.rag.vector_store import vector_store

FALLBACK_ANSWER = (
    "I'm having trouble reaching my knowledge base right now. "
    "Please try again in a moment, or contact us directly: email enquiries@nisuvmarketing.com "
    "or message either WhatsApp number, +91 92171 22561 or +91 79828 42348."
)


def answer_question(question: str, history: list[dict] | None = None) -> dict:
    # Greetings and "what services do you offer?" get a short, fixed answer.
    quick = quick_answer(question)
    if quick:
        return {"answer": quick, "sources": ["services"] if "•" in quick else []}

    # Contact questions get a fixed, always-correct answer (no model involved).
    if CONTACT_INTENT_RE.search(question):
        return {"answer": contact_answer(), "sources": ["contact"]}

    if not vector_store.is_ready:
        vector_store.load()

    try:
        try:
            query_embedding = embed_text(question)
        except Exception as e:  # embeddings down -> still retrieve by keywords
            print(f"EMBEDDING ERROR (using keyword search): {type(e).__name__}: {e}")
            query_embedding = None

        chunks = vector_store.search(question, query_embedding, top_k=settings.RAG_TOP_K)
        answer = sanitize(generate_answer(question, chunks, history=history))
        return {"answer": answer, "sources": sorted({c.source for c in chunks})}
    except Exception as e:
        print(f"RAG PIPELINE ERROR: {type(e).__name__}: {e}")
        return {"answer": FALLBACK_ANSWER, "sources": []}
