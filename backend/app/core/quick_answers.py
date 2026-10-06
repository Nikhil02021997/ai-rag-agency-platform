"""Instant answers for greetings and the "what services do you offer?" question.

Mirrors frontend/src/lib/chatIntents.ts so the chatbot behaves the same whether the
browser or the API answers. No model is involved, and no phone numbers are ever
included in these answers.
"""
from __future__ import annotations

import re

GREETING_TEXT = "Hi! NISUV Marketing is here to help you."

SERVICE_LIST = [
    "Digital marketing & growth",
    "Google & Meta Ads",
    "Website creation & maintenance",
    "SEO",
    "Influencer marketing",
    "AI & RAG systems",
    "Web & product development",
    "Data & analytics",
]

_GREETING_RE = re.compile(
    r"^\s*(hi+|hii+|hello+|hey+|heya|hiya|yo|hola|namaste|greetings|sup|what'?s up|"
    r"good\s+(morning|afternoon|evening))(\s+(there|team|nisuv|nisuv marketing|everyone|guys))?\s*[!.?]*\s*$",
    re.I,
)
_THANKS_RE = re.compile(r"^\s*(thanks|thank you|thx|ty|thank u)\b.{0,20}$", re.I | re.S)
_SERVICES_RE = re.compile(
    r"\b(services?|what (do|can) you (do|offer|provide)|what you offer|offerings?|do you offer|what do you do)\b",
    re.I,
)
# If the visitor names a specific service, let the model answer in detail instead.
_SPECIFIC_RE = re.compile(
    r"\b(seo|ads?|google|meta|facebook|instagram|influencers?|rag|ai|chatbots?|website|web|apps?|"
    r"data|analytics|marketing|social)\b",
    re.I,
)


def services_answer() -> str:
    return "\n".join(["Here are our services:", *[f"• {s}" for s in SERVICE_LIST]])


def quick_answer(question: str) -> str | None:
    q = question.strip()
    if _GREETING_RE.match(q):
        return GREETING_TEXT
    if _THANKS_RE.match(q):
        return "You're welcome! Anything else I can help you with?"
    if _SERVICES_RE.search(q) and not _SPECIFIC_RE.search(q):
        return services_answer()
    return None
