from fastapi import APIRouter
from pydantic import BaseModel
from database import SessionLocal
from models import Experience

router = APIRouter()


class ExperienceCreate(BaseModel):
    user_id: int
    company: str
    role: str
    start_date: str
    end_date: str
    description: str


@router.post("/experience")
def create_experience(exp: ExperienceCreate):

    db = SessionLocal()

    item = Experience(
        user_id=exp.user_id,
        company=exp.company,
        role=exp.role,
        start_date=exp.start_date,
        end_date=exp.end_date,
        description=exp.description,
    )

    db.add(item)
    db.commit()
    db.refresh(item)

    return item


@router.get("/experience/{user_id}")
def get_experience(user_id: int):

    db = SessionLocal()

    return (
        db.query(Experience)
        .filter(Experience.user_id == user_id)
        .all()
    )


@router.put("/experience/{id}")
def update_experience(id: int, exp: ExperienceCreate):

    db = SessionLocal()

    item = db.query(Experience).filter(Experience.id == id).first()

    if not item:
        return {"message": "Not found"}

    item.company = exp.company
    item.role = exp.role
    item.start_date = exp.start_date
    item.end_date = exp.end_date
    item.description = exp.description

    db.commit()

    return item


@router.delete("/experience/{id}")
def delete_experience(id: int):

    db = SessionLocal()

    item = db.query(Experience).filter(Experience.id == id).first()

    if item:
        db.delete(item)
        db.commit()

    return {"message": "Deleted"}