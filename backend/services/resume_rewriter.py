import os
import json
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)


def rewrite_resume(resume_text: str, target_role: str):

    prompt = f"""
You are one of the world's best ATS Resume Writers.

You rewrite resumes exactly like a Senior Resume Consultant from Google or Microsoft.

Target Role:
{target_role}

Candidate Resume:

------------------------

{resume_text}

------------------------

IMPORTANT

Identify every section in the resume.

Possible sections:

- Professional Summary
- Skills
- Work Experience
- Internship
- Projects
- Education
- Certifications
- Achievements
- Key Strengths
- Current Focus

For every detected section:

- Extract the COMPLETE original section.
- Preserve every bullet.
- Preserve every sentence.
- Preserve spacing.
- Preserve headings.
- Never summarize.
- Never omit information.
- Rewrite ONLY the wording professionally.

Return ONLY valid JSON.

{{
  "summary": {{
    "ats_gain": 18,
    "keyword_coverage": 96,
    "impact_bullets": "14/14"
  }},

  "sections": [

    {{
      "title": "Professional Summary",
      "before": "Complete original summary.",
      "after": "Complete rewritten summary.",
      "ats_gain": 5
    }},

    {{
      "title": "Skills",
      "before": "Complete original Skills section with line breaks.",
      "after": "Complete rewritten Skills section keeping bullets and formatting.",
      "ats_gain": 2
    }},

    {{
      "title": "Work Experience",
      "before": "Complete original Work Experience section including company names, dates and bullets.",
      "after": "Complete rewritten Work Experience section preserving all bullets.",
      "ats_gain": 8
    }},

    {{
      "title": "Internship",
      "before": "Complete Internship section.",
      "after": "Complete rewritten Internship section.",
      "ats_gain": 4
    }},

    {{
      "title": "Projects",
      "before": "Complete Projects section.",
      "after": "Complete rewritten Projects section.",
      "ats_gain": 4
    }},

    {{
      "title": "Education",
      "before": "Complete Education section.",
      "after": "Complete rewritten Education section.",
      "ats_gain": 1
    }},

    {{
      "title": "Key Strengths",
      "before": "Complete Key Strengths section.",
      "after": "Complete rewritten Key Strengths section.",
      "ats_gain": 1
    }},

    {{
      "title": "Current Focus",
      "before": "Complete Current Focus section.",
      "after": "Complete rewritten Current Focus section.",
      "ats_gain": 1
    }}

  ],

  "full_resume": "Generate a COMPLETE ATS resume using proper resume formatting.

Rules:

Candidate Name

Email | Phone | LinkedIn | Location

(blank line)

PROFESSIONAL SUMMARY

One professional paragraph.

(blank line)

SKILLS

• Skill 1
• Skill 2
• Skill 3

(blank line)

WORK EXPERIENCE

Company Name
Role
Dates

• Bullet 1
• Bullet 2
• Bullet 3

(blank line)

INTERNSHIP

Company Name

• Bullet
• Bullet

(blank line)

PROJECTS

Project Name

• Bullet
• Bullet

(blank line)

EDUCATION

College
Degree
Year

(blank line)

KEY STRENGTHS

• Strength
• Strength

(blank line)

CURRENT FOCUS

• Point
• Point

VERY IMPORTANT:

Never merge the entire resume into one paragraph.

Preserve proper spacing between sections.

Keep bullets wherever appropriate.

Only Professional Summary should be paragraph.

Everything else should be properly formatted exactly like a modern ATS resume."
}}

Return ONLY JSON.

Do not return markdown.

Do not explain anything.

Do not invent information.

Do not remove any information.

Preserve bullets.

Preserve spacing.
"""

    completion = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        temperature=0.25,
        response_format={"type": "json_object"},
        messages=[
            {
                "role": "system",
                "content": "You are an Expert ATS Resume Writer."
            },
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    result = completion.choices[0].message.content
    print("========= GROQ RESPONSE =========")
    print(result)
    print("=================================")

    try:
        return json.loads(result)

    except Exception as e:

        print(result)

        raise e