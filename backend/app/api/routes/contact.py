import smtplib
from email.message import EmailMessage

from fastapi import APIRouter

from app.core.config import settings
from app.schemas.contact import ContactRequest

router = APIRouter(
    prefix="/contact",
    tags=["Contact"],
)


def send_quote_email(data: ContactRequest) -> None:
    if not (settings.SMTP_HOST and settings.SMTP_USER and settings.SMTP_PASSWORD and settings.CONTACT_TO_EMAIL):
        print("CONTACT EMAIL SKIPPED: SMTP settings not configured in .env")
        print(f"New quote request from {data.name} <{data.email}>: {data.model_dump()}")
        return

    recipients = [addr.strip() for addr in settings.CONTACT_TO_EMAIL.split(",") if addr.strip()]

    msg = EmailMessage()
    msg["Subject"] = f"New quote request from {data.name}"
    msg["From"] = settings.SMTP_USER
    msg["To"] = ", ".join(recipients)
    msg["Reply-To"] = data.email
    msg.set_content(
        f"Name: {data.name}\n"
        f"Email: {data.email}\n"
        f"Phone: {data.phone}\n"
        f"Service interested in: {data.service}\n"
        f"Budget: {data.budget or 'Not specified'}\n\n"
        f"Message:\n{data.message}\n"
    )

    with smtplib.SMTP_SSL(settings.SMTP_HOST, settings.SMTP_PORT) as server:
        server.login(settings.SMTP_USER, settings.SMTP_PASSWORD)
        server.send_message(msg, to_addrs=recipients)


@router.post("")
def submit_contact(request: ContactRequest):
    try:
        send_quote_email(request)
        return {"status": "sent"}
    except Exception as e:
        print(f"CONTACT EMAIL ERROR: {type(e).__name__}: {e}")
        return {"status": "error", "detail": "Could not send email, but request was logged."}