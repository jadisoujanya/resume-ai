import os
import json
from dotenv import load_dotenv
from ai_client import client

load_dotenv()


def analyze_resume(resume_text: str):

    prompt = f"""
You are one of the world's best ATS Resume Reviewers.

Analyze the resume carefully.

Resume:

{resume_text}

Return ONLY valid JSON.

{{
  "resume_score": 0,
  "ats_score": 0,
  "detected_role": "",
  "career_level": "",
  "resume_rank": "",
  "skills_found": [],
  "missing_skills": [],
  "ai_suggestions": [],
  "career_roadmap": [],
  "learning_roadmap": [],
  "professional_summary": "",
  "readiness_score": 0,
  "recommended_tools": [],
  "recommended_certifications": [],
  "salary_range": ""
}}

Rules:

1. Resume Score must be an INTEGER between 0 and 100.
   Never return decimals like 8.5.

2. ATS Score must be an INTEGER between 0 and 100.

3. Every numeric score must be an integer.

4. Detect exact role.

5. Detect experience level.

6. Extract ALL technical skills.

7. Find missing skills for that role.

8. Give exactly 5 resume suggestions.

9. Give exactly 5 career roadmap steps.

10. Give exactly 5 learning roadmap steps.

11. Professional summary around 150 words.

12. Readiness score.

13. Recommend useful developer tools.

14. Recommend certifications.

15. Estimate salary in India.

Respond ONLY JSON.
"""

    completion = client.chat.completions.create(

        model="llama-3.3-70b-versatile",

        temperature=0.3,

        response_format={"type": "json_object"},

        messages=[

            {
                "role": "system",
                "content": "You are an expert ATS Resume Analyzer."
            },

            {
                "role": "user",
                "content": prompt
            }

        ]

    )

    result = completion.choices[0].message.content

    return json.loads(result)