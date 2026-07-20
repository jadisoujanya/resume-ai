import google.generativeai as genai
import json
from settings import GEMINI_API_KEY

genai.configure(api_key=GEMINI_API_KEY)

model = genai.GenerativeModel("gemini-2.5-flash")


def generate_learning_roadmap(role, skills, missing_skills):

    prompt = f"""
You are an AI Career Mentor.

Candidate Role:
{role}

Current Skills:
{", ".join(skills)}

Missing Skills:
{", ".join(missing_skills)}

Recommend ONLY 6 learning resources.

Return ONLY JSON.

Format:

[
  {{
    "title":"",
    "provider":"",
    "weeks":6,
    "level":"Beginner",
    "relevance":95,
    "description":"",
    "url":""
  }}
]

Providers can be:

Coursera
Udemy
AWS Skill Builder
Microsoft Learn
Google Cloud Skills Boost
freeCodeCamp
LinkedIn Learning
Codecademy

No markdown.
No explanation.
Only JSON.
"""

    response = model.generate_content(prompt)

    text = response.text.strip()

    if text.startswith("```json"):
        text = text.replace("```json", "").replace("```", "").strip()

    return json.loads(text)