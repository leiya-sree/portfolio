"""Contact router — POST /contact."""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app import crud, schemas
from app.database import get_db

router = APIRouter(prefix="/contact", tags=["contact"])


@router.post("", response_model=schemas.ContactOut, status_code=201)
def submit_contact(payload: schemas.ContactCreate, db: Session = Depends(get_db)):
    """Store a contact-form submission in the contact_messages table."""
    try:
        row = crud.create_contact_message(db, payload)
    except Exception as exc:  # noqa: BLE001 - surface a clear 500 to the client
        raise HTTPException(status_code=500, detail=f"Database error: {exc}") from exc
    return row
