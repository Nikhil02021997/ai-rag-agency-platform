import json
import re
import sys
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(PROJECT_ROOT / "backend"))

from app.core.config import settings
from app.rag.embedder import embed_batch


def chunk_markdown(text, source):
    raw_chunks = [c.strip() for c in re.split(r"\n\s*\n", text) if c.strip()]
    return [{"source": source, "text": c} for c in raw_chunks if len(c) > 20]


def main():
    settings.PROCESSED_DIR.mkdir(parents=True, exist_ok=True)

    chunks = []
    doc_files = sorted(settings.DOCUMENTS_DIR.glob("*.md"))
    if not doc_files:
        print(f"No .md files found in {settings.DOCUMENTS_DIR}")
        return

    for path in doc_files:
        chunks.extend(chunk_markdown(path.read_text(encoding="utf-8"), path.stem))

    print(f"Chunked {len(doc_files)} document(s) into {len(chunks)} chunks.")
    print("Embedding chunks with Ollama...")

    try:
        embeddings = embed_batch([c["text"] for c in chunks])
    except Exception as e:
        sys.exit(f"Embedding failed ({type(e).__name__}: {e}).\n"
                 f"Is Ollama running, and have you run: ollama pull {settings.OLLAMA_EMBED_MODEL} ?")
    for chunk, vector in zip(chunks, embeddings):
        chunk["embedding"] = vector

    settings.INDEX_PATH.write_text(json.dumps(chunks), encoding="utf-8")
    print(f"Saved knowledge base with {len(chunks)} chunks to {settings.INDEX_PATH}")


if __name__ == "__main__":
    main()
    