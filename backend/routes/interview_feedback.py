from fastapi import APIRouter
from pydantic import BaseModel

from ai_client import client

router = APIRouter(prefix="/interview", tags=["Interview"])


class FeedbackRequest(BaseModel):
    question: str
    answer: str


@router.post("/feedback")
def feedback(req: FeedbackRequest):

    prompt = f"""
You are a friendly AI interviewer.

Interview Question:
{req.question}

Candidate Answer:
{req.answer}

Reply ONLY in this format.

Score: xx/100

Strengths:
- ...

Improvements:
- ...

Ideal Answer:
...
"""

    response = client.chat.completions.create(
        model="gpt-4.1-mini",
        messages=[
            {
                "role": "system",
                "content": "You are a friendly interview coach."
            },
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    return {
        "feedback": response.choices[0].message.content
    }