"""CRUD helpers used by the routers."""
from sqlalchemy.orm import Session

from app import models, schemas


def list_projects(db: Session) -> list[models.Project]:
    return (
        db.query(models.Project)
        .order_by(models.Project.sort_order, models.Project.id)
        .all()
    )


def create_contact_message(db: Session, payload: schemas.ContactCreate) -> models.ContactMessage:
    row = models.ContactMessage(
        name=payload.name,
        email=payload.email,
        subject=payload.subject,
        message=payload.message,
    )
    db.add(row)
    db.commit()
    db.refresh(row)
    return row
