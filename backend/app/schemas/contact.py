from pydantic import BaseModel, EmailStr, Field


class ContactRequest(BaseModel):
    name: str = Field(..., min_length=1, max_length=200)
    email: EmailStr
    phone: str = Field(..., min_length=6, max_length=30)
    service: str = Field(..., min_length=1, max_length=200)
    budget: str = ""
    message: str = Field(..., min_length=1, max_length=2000)