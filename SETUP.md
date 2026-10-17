# Setup (after this update)

## Backend (chatbot + contact form)
1. `ollama pull llama3.1:8b` and `ollama pull nomic-embed-text` (Ollama must be running).
2. `cd backend && pip install -r requirements.txt`
3. From the project root: `python scripts/ingest.py`  (adds semantic embeddings to the knowledge base;
   a keyword-only version is already included so chat works even before this step)
4. `cd backend && uvicorn app.main:app --port 8000`

## Frontend
- Local dev: `frontend/.env.local` already has `NEXT_PUBLIC_API_URL=http://localhost:8000`.
  `cd frontend && npm install && npm run dev`
- Production: leave `NEXT_PUBLIC_API_URL` unset and put nginx in front (see `infrastructure/nginx/nisuv.conf`),
  which serves `frontend/out` and proxies `/api` to the backend. GitHub Pages alone cannot run the chatbot.
  Add your site to CORS only if the frontend and API are on different domains: `CORS_ORIGINS=https://yourdomain` in `.env`.

## Editing company info
- Chatbot knowledge: `data/documents/*.md`, then re-run `python scripts/ingest.py`.
- Email/WhatsApp numbers the bot may give out: `backend/app/core/contact_info.py`.

## Before launch
- Rotate the SMTP password in `.env` (it has been shared) and confirm `SMTP_USER` mailbox is still active.
- Replace the placeholder stats on the About and Work pages with real numbers.
