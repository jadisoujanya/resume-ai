from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from passlib.context import CryptContext

from database import SessionLocal
from models import User

router = APIRouter()

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/signup")
def signup(user: dict, db: Session = Depends(get_db)):

    existing = db.query(User).filter(
        User.email == user["email"]
    ).first()

    if existing:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    hashed_password = pwd_context.hash(user["password"])

    new_user = User(

        name=user["name"],
        dob=user["dob"],
        gender=user["gender"],

        country=user["country"],
        state=user["state"],
        city=user["city"],

        role=user["role"],

        email=user["email"],
        phone=user["phone"],

        password=hashed_password,

        verified=True

        

    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "success": True,
        "message": "Signup Successful"
    }


@router.post("/login")
def login(data: dict, db: Session = Depends(get_db)):

    user = db.query(User).filter(
        User.email == data["email"]
    ).first()

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    if not pwd_context.verify(
        data["password"],
        user.password
    ):
        raise HTTPException(
            status_code=401,
            detail="Incorrect Password"
        )

    return {

    "success": True,

    "message": "Login Successful",

    "user": {

        "id": user.id,
        "name": user.name,
        "email": user.email,
        "phone": user.phone,
        "role": user.role,
        "dob": user.dob,
        "gender": user.gender,
        "country": user.country,
        "state": user.state,
        "city": user.city,
        "github": user.github,
        "linkedin": user.linkedin,

    }

}