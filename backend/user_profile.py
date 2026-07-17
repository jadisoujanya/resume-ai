from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import SessionLocal
from models import User

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/profile/{id}")
def get_profile(id: int, db: Session = Depends(get_db)):

    print("REQUESTED ID =", id)

    user = db.query(User).filter(User.id == id).first()

    print("USER FOUND =", user)

    if not user:
        return {"success": False}

    return {
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "phone": user.phone,
        "gender": user.gender,
        "country": user.country,
        "state": user.state,
        "city": user.city,
        "github": user.github,
        "linkedin": user.linkedin,
        "profile_image": user.profile_image
    }


@router.put("/profile/{id}")
def update_profile(id: int, data: dict, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == id).first()

    if not user:
        return {"success": False}

    user.name = data["name"]
    user.phone = data["phone"]
    user.gender = data["gender"]
    user.country = data["country"]
    user.state = data["state"]
    user.city = data["city"]
    user.github=data.get("github")
    user.linkedin=data.get("linkedin")

    db.commit()

    return {"success": True}