from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.router import api_router
from app.core.config import settings

app = FastAPI(
    title="AI RAG Agency Platform",
    version="1.0.0",
)

# Comma-separated extra origins can be set in .env, e.g. CORS_ORIGINS=https://nisuvmarketing.com
_origins = ["http://localhost:3000", "http://127.0.0.1:3000"]
_origins += [o.strip() for o in settings.CORS_ORIGINS.split(",") if o.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health_check():
    return {"status": "ok"}


# Served at both /chat and /api/chat (etc.), so the frontend's "/api/..." calls work
# whether nginx forwards /api as-is or the browser talks to the backend directly.
app.include_router(api_router)
app.include_router(api_router, prefix="/api")
