from fastapi import APIRouter, Depends
print("1")

from sqlalchemy.orm import Session
print("2")

from database import SessionLocal
print("3")

from models import Resume
print("4")

from groq import Groq
print("5")

from settings import GROQ_API_KEY
print("6")

import json
print("7")

client = Groq(api_key=GROQ_API_KEY)
print("8")

router = APIRouter(prefix="/learning", tags=["Learning"])
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/{user_id}")
def get_learning(user_id: int, db: Session = Depends(get_db)):

    resume = (
        db.query(Resume)
        .filter(Resume.user_id == user_id)
        .order_by(Resume.id.desc())
        .first()
    )

    if not resume:
        return []

    role = resume.detected_role
    skills = resume.skills

    prompt = f"""
You are an AI Career Coach.

Role:
{role}

Current Skills:
{skills}

Recommend exactly 6 learning resources.

For each recommendation return JSON like:

[
 {{
   "title":"Machine Learning Specialization",
   "provider":"Coursera",
   "weeks":10,
   "level":"Intermediate",
   "relevance":95,
   "url":"https://www.coursera.org/learn/machine-learning",
   "preview_url":"https://www.coursera.org/learn/machine-learning"
 }}
]

Return ONLY JSON.
"""

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        temperature=0.3,
        response_format={"type": "json_object"},
        messages=[
            {
            "role": "system",
            "content": "You are an AI Career Coach."
            },
            {
            "role": "user",
            "content": prompt
            }
        ]
    )

    text = response.choices[0].message.content

    courses = json.loads(text)["recommendations"]

    for index, course in enumerate(courses):
        course["id"] = index + 1

    return courses