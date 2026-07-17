from fastapi import APIRouter
from database import SessionLocal
from models import Certification
from pydantic import BaseModel

router = APIRouter()

class CertificationCreate(BaseModel):
    user_id: int
    certificate_name: str
    organization: str
    year: str


@router.get("/certification/{user_id}")
def get_certifications(user_id: int):
    db = SessionLocal()
    return (
        db.query(Certification)
        .filter(Certification.user_id == user_id)
        .all()
    )


@router.post("/certification")
def add_certification(cert: CertificationCreate):
    db = SessionLocal()

    item = Certification(**cert.dict())

    db.add(item)
    db.commit()
    db.refresh(item)

    return item


@router.delete("/certification/{id}")
def delete_certification(id: int):
    db = SessionLocal()

    item = db.query(Certification).filter(Certification.id == id).first()

    if item:
        db.delete(item)
        db.commit()

    return {"success": True}