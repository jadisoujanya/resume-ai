import os
import json
import google.generativeai as genai

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = genai.GenerativeModel("gemini-2.5-flash")


def generate_learning_recommendations(role, skills, missing_skills):
    prompt = f"""
You are an AI career coach.

Role:
{role}

Current Skills:
{skills}

Missing Skills:
{missing_skills}

Return ONLY JSON.

Example:

[
 {{
   "title":"Advanced FastAPI",
   "provider":"Coursera",
   "weeks":6,
   "level":"Intermediate",
   "relevance":96
 }},
 {{
   "title":"Docker Essentials",
   "provider":"Udemy",
   "weeks":4,
   "level":"Beginner",
   "relevance":91
 }}
]

Generate exactly 6 recommendations.
"""

    response = model.generate_content(prompt)

    text = response.text.strip()

    if text.startswith("```"):
        text = text.replace("```json", "").replace("```", "").strip()

    return json.loads(text)