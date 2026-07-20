from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db
from models import (
    Resume,
    Experience,
    Certification,
    Education,
)
router = APIRouter(
    prefix="/analytics",
    tags=["Analytics"]
)


@router.get("/{user_id}")
def analytics(user_id: int, db: Session = Depends(get_db)):
    print("Analytics API started")

    resumes = (
        db.query(Resume)
        .filter(Resume.user_id == user_id)
        .order_by(Resume.id.asc())
        .all()
    )


    if len(resumes) == 0:
        return {
            "resumeSummary": {},
            "skillDistribution": [],
            "skillCategories": {},
            "skillEvidence": [],
            "sectionScores": [],
            "interviewReadiness": [],
        }
    print("Resumes:", len(resumes))

    latest = resumes[-1]
    
    print("Latest resume loaded")


    experience = (
        db.query(Experience)
        .filter(Experience.user_id == user_id)
        .all()
    )

    print("Experience loaded")

    certifications = (
        db.query(Certification)
        .filter(Certification.user_id == user_id)
        .all()
    )

    print("Certifications loaded")

    education = (
        db.query(Education)
        .filter(Education.user_id == user_id)
        .all()
    )

    print("Education loaded")



# ------------------------
# Latest Resume Skills
# ------------------------

    skills = []

    if latest.skills:
        skills = [
            s.strip()
            for s in latest.skills.split(",")
            if s.strip()
        ]




    # Single Resume Trend (Current Resume Only)

    ats_trend = [
        {
            "resume": "Current Resume",
            "resumeScore": latest.resume_score,
            "atsScore": latest.ats_score,
        }
    ]

    performance_trend = [
        {
            "resume": "Current Resume",
            "resumeScore": latest.resume_score,
            "atsScore": latest.ats_score,
            "skillsCount": len(skills)
         }
    ]


    # ------------------------
    # Skill Categories
    # ------------------------

    categories = {
       "Programming": [
            "python","java","c","c++","c#","javascript","typescript",
            "go","rust","php","ruby","swift","kotlin","r","matlab"
        ],

        "Frameworks": [
            "react","nextjs","angular","vue","node","express",
            "django","flask","spring","fastapi","laravel",
            "bootstrap","tailwind"
        ],

        "Database": [
            "mysql","postgresql","mongodb","sqlite",
            "oracle","redis","firebase","cassandra"
        ],

        "AI / ML": [
            "tensorflow","keras","pytorch",
            "scikit-learn","opencv","langchain",
            "huggingface","llm","machine learning",
            "deep learning","nlp","transformers"
        ],

        "Cloud": [
            "aws","azure","gcp","docker",
            "kubernetes","terraform","jenkins"
        ],
  
        "Data Science": [
            "pandas","numpy","matplotlib",
            "seaborn","power bi","tableau",
            "excel","statistics"
        ],

        "Web": [
            "html","css","sass","rest",
            "graphql","json","xml"
        ],

        "Mobile": [
            "android","ios","flutter",
            "react native","xamarin"
        ],

        "DevOps": [
            "docker","kubernetes","jenkins",
            "ansible","terraform","github actions",
            "gitlab ci"
        ],

       "Testing": [
            "selenium","junit","pytest",
            "cypress","postman"
        ],

        "Tools": [
            "git","github","gitlab",
            "jira","linux","figma",
            "postman","vscode","eclipse","intellij"
        ],

        "Soft Skills": [
            "leadership","communication",
            "teamwork","problem solving",
            "critical thinking","presentation",
            "collaboration","time management"
        ]

    }



    distribution = {}

    for category in categories:
        distribution[category] = {
            "count": 0,
            "skills": []
         }

    distribution["Others"] = {
        "count": 0,
        "skills": []
    }



    for skill in skills:

        skill_lower = (
            skill.lower()
            .replace(".", "")
            .replace("-", "")
            .replace(" ", "")
        )

        found = False

        for category, values in categories.items():

            for keyword in values:

                keyword = (
                    keyword.lower()
                    .replace(".", "")
                    .replace("-", "")
                    .replace(" ", "")
                )

                if keyword == skill_lower or keyword in skill_lower:

                    distribution[category]["count"] += 1

                    if skill not in distribution[category]["skills"]:
                        distribution[category]["skills"].append(skill)

                    found = True
                    break

            if found:
                break

        if not found:

            distribution["Others"]["count"] += 1

            if skill not in distribution["Others"]["skills"]:
                distribution["Others"]["skills"].append(skill)

    
    skill_distribution = []

    for category, data in distribution.items():

        count = len(set(data["skills"]))

        if count > 0:

            skill_distribution.append({
                "name": category,
                "value": count,
            })
   

    skill_categories = {}

    for category, data in distribution.items():

        unique = sorted(set(data["skills"]))

        skill_categories[category] = unique



    # ------------------------
    # Resume Summary
    # ------------------------

    resume_summary = {
        "resumeScore": round(latest.resume_score or 0),
        "atsScore": round(latest.ats_score or 0),
        "role": latest.detected_role,
        "careerLevel": latest.career_level,
    }

    # ------------------------
    # Skill Evidence
    # ------------------------

    skill_strength = []

    for skill in skills:

        strength = 20

        # Experience
        for exp in experience:
            txt = f"{exp.role} {exp.description or ''}".lower()
            if skill.lower() in txt:
                strength += 35
                break

        # Certification
        for cert in certifications:
            txt = f"{cert.certificate_name} {cert.organization}".lower()
            if skill.lower() in txt:
                strength += 25
                break

        # Education
        for edu in education:
            txt = f"{edu.degree} {edu.college}".lower()
            if skill.lower() in txt:
                strength += 15
                break

        strength = min(strength, 100)

        skill_strength.append({
            "skill": skill,
            "strength": strength,
        })

    # ------------------------
    # Section Scores
    # ------------------------

    skills_score = (
        round(sum(s["strength"] for s in skill_strength) / len(skill_strength))
        if skill_strength else 0
    )

    experience_score = min(len(experience) * 20, 100)

    education_score = min(len(education) * 30, 100)

    certification_score = min(len(certifications) * 20, 100)

    projects_score = 60

    section_scores = [
        {
            "section": "Skills",
            "score": skills_score,
        },
        {
            "section": "Experience",
            "score": experience_score,
        },
        {
            "section": "Projects",
            "score": projects_score,
        },
        {
            "section": "Education",
            "score": education_score,
        },
        {
            "section": "Certificates",
            "score": certification_score,
        },
    ]

    # ------------------------
    # Interview Readiness
    # ------------------------

    interview_readiness = [
       {
            "stage": "Resume Quality",
            "value": round(latest.resume_score or 0),
       },
       {
            "stage": "ATS Compatibility",
            "value": round(latest.ats_score or 0),
        },
        {
            "stage": "Skill Confidence",
            "value": skills_score,
        },
    ]


    print(skill_distribution)
    
    # ------------------------
    # Final Response
    # ------------------------

    return {

        "resumeSummary": resume_summary,

        "skillDistribution": skill_distribution,

        "skillCategories": skill_categories,

        "skillEvidence": skill_strength,

        "sectionScores": section_scores,

        "interviewReadiness": interview_readiness,

    }