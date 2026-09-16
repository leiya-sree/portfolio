"""Pydantic request/response schemas."""
from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel, EmailStr, Field


class ProjectBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=255)
    description: str
    tech_stack: Optional[List[str]] = None
    github_url: Optional[str] = None
    demo_url: Optional[str] = None
    image: Optional[str] = None
    featured: bool = False
    sort_order: int = 0


class ProjectOut(ProjectBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True


class ContactCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=120)
    email: EmailStr
    subject: str = Field(..., min_length=1, max_length=200)
    message: str = Field(..., min_length=10)


class ContactOut(ContactCreate):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True


class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1)
