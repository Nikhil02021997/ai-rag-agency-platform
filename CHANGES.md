# What changed in this update

## 1. Home page: 8 service cards -> 3 categories (click to open sub-sections)
- NEW  frontend/src/components/ServiceCategories.tsx   (Marketing & growth / Web & product / AI, RAG & data)
- EDIT frontend/src/app/page.tsx                        (uses ServiceCategories)
  Marketing & growth -> Digital marketing & growth, Google & Meta Ads, SEO, Influencer Marketing
  Web & product      -> Website Creation & Maintenance, Web & product development
  AI, RAG & data     -> AI & RAG systems, Data & analytics
  To rename / regroup, edit the CATEGORIES list at the top of ServiceCategories.tsx.

## 2. Hero illustration (three people) is now clickable
- EDIT frontend/src/components/OfficeScene.tsx, OfficeHero.tsx, app/globals.css
  Left column -> Web & product, centre -> Marketing, right -> AI, RAG & data.
  Clicking a column (or its pill) scrolls to "What we do" and opens that category.

## 3. Chatbot
- EDIT frontend/src/components/ChatWidget.tsx   greeting, tap-to-ask question chips, list formatting
- NEW  frontend/src/lib/chatIntents.ts          instant answers (edit QUICK_QUESTIONS / SERVICE_LIST here)
- NEW  backend/app/core/quick_answers.py, EDIT backend/app/rag/pipeline.py + prompts.py
- EDIT cloudflare-worker/worker.js              (re-paste into Cloudflare to go live, see its README)
  "hi" -> "Hi! NISUV Marketing is here to help you." + question chips under it.
  "services" -> a plain bullet list of the 8 services (no summary, no phone numbers).

## 4. WhatsApp: no numbers shown, visitor picks a line
- NEW  frontend/src/components/WhatsAppChooser.tsx, WhatsAppIcon.tsx, frontend/src/lib/contact.ts
- EDIT Header.tsx (Contact menu), Footer.tsx, WhatsAppButton.tsx (floating), app/contact/page.tsx
  The numbers now live ONLY in frontend/src/lib/contact.ts (WHATSAPP_LINES).
