from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import SessionLocal
from models import Education

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/education")
def add_education(data: dict, db: Session = Depends(get_db)):

    edu = Education(
        user_id=data["user_id"],
        degree=data["degree"],
        college=data["college"],
        start_year=data["start_year"],
        end_year=data["end_year"],
    )

    db.add(edu)
    db.commit()
    db.refresh(edu)

    return edu


@router.get("/education/{user_id}")
def get_education(user_id: int, db: Session = Depends(get_db)):

    return db.query(Education).filter(
        Education.user_id == user_id
    ).all()


@router.delete("/education/{id}")
def delete_education(id: int, db: Session = Depends(get_db)):

    edu = db.query(Education).filter(
        Education.id == id
    ).first()

    if edu:
        db.delete(edu)
        db.commit()

    return {"success": True}