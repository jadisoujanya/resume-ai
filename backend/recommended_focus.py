from groq import Groq
import os
import json
from dotenv import load_dotenv

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))


def generate_recommended_focus(role, missing_skills):

    if not missing_skills:
        return []

    prompt = f"""
You are an expert AI Career Coach.

Target Role:
{role}

Missing Skills:
{", ".join(missing_skills)}

Pick ONLY the 3 highest priority skills.

Return ONLY JSON in this format:

[
 {{
   "title":"Docker",
   "weeks":4,
   "roi":"+18%",
   "why":"Widely required for backend deployment."
 }}
]
"""

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0.3
    )

    try:
        content = response.choices[0].message.content

        content = content.replace("```json", "")
        content = content.replace("```", "")
        content = content.strip()

        return json.loads(content)
    except Exception:
        return []