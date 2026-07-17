from nlp_skill_detector import detect_additional_skills
from smart_skill_detector import detect_unknown_skills

skills_db = [

    # Programming
    "python","java","c","c++","c#","javascript",
    "typescript","go","rust","kotlin","swift","php","r",

    # Frontend
    "html","css","bootstrap","react","angular",
    "vue","next.js","tailwind","jquery",

    # Backend
    "node.js","express","django","flask",
    "fastapi","spring","spring boot",".net","laravel",

    # Database
    "sql","mysql","postgresql","mongodb",
    "oracle","sqlite","redis","cassandra",

    # Cloud
    "aws","azure","gcp","cloud computing",

    # DevOps
    "docker","kubernetes","jenkins",
    "terraform","ansible","git","github","gitlab",

    # Data Analytics
    "pandas","numpy","matplotlib",
    "seaborn","tableau","power bi",
    "data analytics","data visualization",

    # AI / ML
    "machine learning",
    "deep learning",
    "tensorflow",
    "pytorch",
    "nlp",
    "computer vision",
    "generative ai",
    "llm",
    "transformers",
    "langchain",
    "rag",
    "chatgpt",

    # Mobile
    "android",
    "ios",
    "flutter",
    "react native",

    # Cyber Security
    "cybersecurity",
    "ethical hacking",
    "penetration testing",
    "network security",

    # Testing
    "selenium",
    "pytest",
    "junit",
    "automation testing",

    # Business
    "agile",
    "scrum",
    "project management",
    "business analysis",

    # Soft Skills
    "communication",
    "leadership",
    "teamwork",
    "problem solving",
    "critical thinking",

    # Emerging
    "blockchain",
    "iot",
    "quantum computing"
]

def analyze_resume(text):

    text_lower = text.lower()

    found_skills = []

    for skill in skills_db:

        if skill.lower() in text_lower:

            found_skills.append(skill)

    found_skills = list(set(found_skills))

    # Resume Score

    skill_score = min(
        len(found_skills) * 5,
        70
    )

    experience_bonus = 15 if "experience" in text_lower else 0

    project_bonus = 10 if (
        "project" in text_lower
        or
        "projects" in text_lower
    ) else 0

    education_bonus = 5 if (
        "education" in text_lower
        or
        "b.tech" in text_lower
        or
        "m.tech" in text_lower
        or
        "degree" in text_lower
    ) else 0

    score = (
        skill_score
        + experience_bonus
        + project_bonus
        + education_bonus
    )

    score = min(score, 100)

    explanation = [

        f"{skill} detected"

        for skill in found_skills
    ]

    additional_skills = detect_additional_skills(text)

    unknown_skills = detect_unknown_skills(text)

    all_skills = list(
    set(
        found_skills +
        additional_skills +
        unknown_skills
    )
)

    return {

        "resume_score": score,

        "skills": all_skills,

        "skills_found": found_skills,

        "nlp_detected_skills": additional_skills,

        "emerging_skills": unknown_skills,

        "total_skills": len(all_skills),

        "explanation": explanation

    }