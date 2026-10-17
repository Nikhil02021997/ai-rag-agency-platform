from fastapi import APIRouter

from app.api.routes import services
from app.api.routes import case_studies
from app.api.routes import contact
from app.api.routes import chat


api_router = APIRouter()

api_router.include_router(services.router)
api_router.include_router(case_studies.router)
api_router.include_router(contact.router)
api_router.include_router(chat.router)