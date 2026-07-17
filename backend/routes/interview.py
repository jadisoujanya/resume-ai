from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from models import Resume
from pydantic import BaseModel
import google.generativeai as genai
import os

router = APIRouter(prefix="/interview", tags=["Interview"])

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = genai.GenerativeModel("gemini-2.5-flash")


class InterviewRequest(BaseModel):
    user_id: int
    role: str
    difficulty: str = "Medium"


@router.post("/generate")
def generate_questions(req: InterviewRequest, db: Session = Depends(get_db)):

    resume = db.query(Resume).filter(
        Resume.user_id == req.user_id
    ).first()

    skills = resume.skills if resume else ""

    prompt = f"""
Generate 10 interview questions.

Role:
{req.role}

Difficulty:
{req.difficulty}

Skills:
{skills}

Return ONLY a numbered list.

Example:

1. Explain REST API.
2. What is JWT?
"""

    response = model.generate_content(prompt)

    text = response.text.strip()

    questions = []

    for line in text.split("\n"):

        line = line.strip()

        if line:

            if "." in line:
                question = line.split(".", 1)[1].strip()
            else:
                question = line

            questions.append(question)

    return questions