from fastapi import APIRouter
from database import SessionLocal
from models import Resume

router = APIRouter()

@router.get("/dashboard")

def dashboard():

    db = SessionLocal()

    latest = db.query(Resume).order_by(Resume.id.desc()).first()

    if latest is None:

        return {"success":False}

    return {

        "success":True,

        "resumeScore":latest.resume_score,

        "atsScore":latest.ats_score,

        "careerLevel":latest.career_level,

        "role":latest.detected_role,

        "skills":latest.skills.split(","),

        "roadmap":latest.roadmap.split("\n"),

        "suggestions":latest.ai_suggestions.split("\n")

    }