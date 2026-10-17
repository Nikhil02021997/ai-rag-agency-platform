from pathlib import Path

from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    APP_ENV: str = "development"
    APP_NAME: str = "AI RAG Agency Platform"

    DATABASE_URL: str = ""

    OLLAMA_BASE_URL: str = "http://localhost:11434"
    OLLAMA_CHAT_MODEL: str = "llama3.2"
    OLLAMA_EMBED_MODEL: str = "nomic-embed-text"

    RAG_TOP_K: int = 5

    # comma-separated, e.g. https://nisuvmarketing.com,https://www.nisuvmarketing.com
    CORS_ORIGINS: str = ""

    SMTP_HOST: str = ""
    SMTP_PORT: int = 587
    SMTP_USER: str = ""
    SMTP_PASSWORD: str = ""
    CONTACT_TO_EMAIL: str = "enquiries@nisuvmarketing.com"

    PROJECT_ROOT: Path = Path(__file__).resolve().parents[3]

    @property
    def DOCUMENTS_DIR(self) -> Path:
        return self.PROJECT_ROOT / "data" / "documents"

    @property
    def PROCESSED_DIR(self) -> Path:
        return self.PROJECT_ROOT / "data" / "processed"

    @property
    def INDEX_PATH(self) -> Path:
        return self.PROCESSED_DIR / "knowledge_base.json"

    class Config:
        # absolute path, so it works no matter which folder uvicorn is started from
        env_file = str(Path(__file__).resolve().parents[3] / ".env")
        extra = "ignore"


settings = Settings()