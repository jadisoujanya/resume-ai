from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models import Resume
from pydantic import BaseModel

from google import genai
from settings import GEMINI_API_KEY

client = genai.Client(api_key=GEMINI_API_KEY)

router = APIRouter(
    prefix="/interview",
    tags=["Interview"]
)
class InterviewRequest(BaseModel):
    user_id: int
    role: str
    difficulty: str = "Medium"

class FeedbackRequest(BaseModel):
    question: str
    answer: str



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


    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt
        )
        
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=str(e))

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


   
@router.post("/feedback")
def interview_feedback(req: FeedbackRequest):

    prompt = f"""

You are an experienced technical interviewer.

The candidate is practicing interviews.

Question:
{req.question}

Answer:
{req.answer}

Respond in a friendly tone.

Start with one positive sentence.

Then provide:

### What you did well
- ...

### What can be improved
- ...

### Sample better answer
(2-4 sentences)

Don't be harsh.
Don't give scores.
Keep the response concise.
"""


    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    return {
        "feedback": response.text.strip()
    }