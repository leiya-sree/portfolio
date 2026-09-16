"""SQLAlchemy ORM models mapped to the MySQL tables."""
from datetime import datetime

from sqlalchemy import Column, DateTime, Integer, String, Text
from sqlalchemy.dialects.mysql import LONGTEXT

from app.database import Base


class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), unique=True, nullable=False, index=True)
    description = Column(LONGTEXT, nullable=False)
    tech_stack = Column(LONGTEXT, nullable=True)          # comma-separated
    github_url = Column(String(512), nullable=True)
    demo_url = Column(String(512), nullable=True)
    image = Column(String(512), nullable=True)
    featured = Column(Integer, default=0)                  # 0/1 boolean flag
    sort_order = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)


class ContactMessage(Base):
    __tablename__ = "contact_messages"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(120), nullable=False)
    email = Column(String(160), nullable=False, index=True)
    subject = Column(String(200), nullable=False)
    message = Column(LONGTEXT, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
