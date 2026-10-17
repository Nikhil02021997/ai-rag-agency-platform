"""Single source of truth for contact details the chatbot is allowed to give out.

Change them here (and in data/documents/contact.md) and nowhere else.
"""
import re

CONTACT_EMAIL = "enquiries@nisuvmarketing.com"

WHATSAPP_NUMBERS = [
    ("+91 92171 22561", "https://wa.me/919217122561"),
    ("+91 79828 42348", "https://wa.me/917982842348"),
]

_EMAIL_RE = re.compile(r"[\w.+-]+@[\w-]+(?:\.[\w-]+)+")
_ALLOWED_PHONE_DIGITS = {re.sub(r"\D", "", n) for n, _ in WHATSAPP_NUMBERS}


def contact_block() -> str:
    numbers = " or ".join(f"{n} ({url})" for n, url in WHATSAPP_NUMBERS)
    return f"Email: {CONTACT_EMAIL}\nWhatsApp / phone (either number works): {numbers}"


def contact_answer() -> str:
    return (
        f"You can email us at {CONTACT_EMAIL}. For a quicker response, message or call "
        f"either of our numbers on WhatsApp: {WHATSAPP_NUMBERS[0][0]} "
        f"({WHATSAPP_NUMBERS[0][1]}) or {WHATSAPP_NUMBERS[1][0]} ({WHATSAPP_NUMBERS[1][1]}). "
        "You can also use the Get a Quote form on our contact page."
    )


def sanitize(answer: str) -> str:
    """Safety net: whatever the model writes, only our one email address may appear."""
    answer = _EMAIL_RE.sub(
        lambda m: m.group(0) if m.group(0).lower() == CONTACT_EMAIL else CONTACT_EMAIL, answer
    )
    # collapse "enquiries@..., or enquiries@..." duplicates produced by the replacement
    answer = re.sub(
        rf"{re.escape(CONTACT_EMAIL)}(?:\s*(?:,|and|or|/))+\s*{re.escape(CONTACT_EMAIL)}(?:(?:\s*(?:,|and|or|/))+\s*{re.escape(CONTACT_EMAIL)})*",
        CONTACT_EMAIL,
        answer,
        flags=re.I,
    )
    return answer


CONTACT_INTENT_RE = re.compile(
    r"\b(e-?mail|mail id|whatsapp|what'?s ?app|phone|mobile|call|contact|reach (you|out)|"
    r"get in touch|talk to (someone|a person|you)|(phone|contact|mobile|whatsapp) number)\b",
    re.I,
)
