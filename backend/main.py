from fastapi import FastAPI
from fastapi import UploadFile, File
from pdfminer.high_level import extract_text
import tempfile
from skills_data import skills
from resume_analyzer import analyze_resume as rule_based_analyze
from ai_resume_analyzer import analyze_resume as ai_analyze_resume
from services.resume_rewriter import rewrite_resume
from skill_gap import find_skill_gap
from job_match import calculate_match
from notification import router as notification_router
from certification import router as certification_router
from auth import router as auth_router
from user_profile import router as profile_router
from experience import router as experience_router
from recommended_focus import generate_recommended_focus
from explainable_ai import explain_match
from routes.interview import router as interview_router
from career_roadmap import (
    ROLE_ALIASES,
    generate_roadmap,
    detect_resume_role
)
from trust_score import calculate_trust_score
from multi_resume import compare_candidates
from job_market import market_trends
from fastapi.middleware.cors import CORSMiddleware
from career_predictor import predict_career
from result_generator import generate_resume_report
from ats_checker import calculate_ats_score
from learning_roadmap import generate_learning_roadmap
from fastapi.responses import FileResponse
from reportlab.pdfgen import canvas
from education import router as education_router
from resume_suggestions import generate_ai_suggestions
import re
from database import Base, engine
from dashboard_api import router as dashboard_router
from job_recommender import recommend_jobs



def extract_summary(text):

    text = text.strip()

    lower_text = text.lower()

    sections = [

        "professional summary",
        "summary",
        "career objective",
        "objective",
        "profile summary",
        "about me"

    ]

    start = -1

    for section in sections:

        pos = lower_text.find(section)

        if pos != -1:

            start = pos + len(section)

            break

    if start == -1:

        return "No Professional Summary Found."

    remaining = text[start:]

    stop_words = [

        "experience",
        "professional experience",
        "work experience",

        "education",

        "skills",

        "technical skills",

        "projects",

        "key projects",

        "certifications",

        "internships",

        "achievements",

        "hobbies",

        "languages"

    ]

    end = len(remaining)

    remaining_lower = remaining.lower()

    for word in stop_words:

        pos = remaining_lower.find(word)

        if pos > 30:

            end = min(end, pos)

    summary = remaining[:end]

    summary = re.sub(
        r"\s+",
        " ",
        summary
    )

    return summary.strip()

app = FastAPI()

origins = [
    "http://localhost:8081",
    "http://127.0.0.1:8081",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(auth_router)
app.include_router(profile_router)
app.include_router(education_router)
app.include_router(experience_router)
app.include_router(certification_router)
app.include_router(dashboard_router)
app.include_router(notification_router)
app.include_router(interview_router)

from pydantic import BaseModel

class JobRequest(BaseModel):

    skills:list[str]


@app.post("/recommend-jobs")

def recommend(req:JobRequest):
    print(req.skills)
    return recommend_jobs(req.skills)



Base.metadata.create_all(bind=engine)

@app.get("/")
def home():
    return {
        "message": "Career AI Backend Running Successfully"
    }

@app.get("/skills")
def get_skills():
    return skills

# ==========================
# Resume Analysis Module
# ==========================
@app.get("/analyze")
def analyze(text: str):

    result = ai_analyze_resume(text)

    return result


# ==========================
# Skill Gap Detection Module
# ==========================

@app.get("/skill-gap")
def skill_gap():

    db = SessionLocal()

    latest = (
        db.query(Resume)
        .order_by(Resume.id.desc())
        .first()
    )

    if not latest:
        return {"missing_skills": []}

    resume_skills = latest.skills.split(",")

    role = latest.detected_role.lower()

    role_info = generate_roadmap(role)

    required_skills = role_info["skills"]

    return find_skill_gap(
        resume_skills,
        required_skills
    )

# ==========================
# Job Match Score Module
# ==========================
@app.get("/job-match")
def job_match():

    resume_skills = [
        "python",
        "sql",
        "machine learning"
    ]

    job_skills = [
        "python",
        "sql",
        "aws",
        "docker"
    ]

    return calculate_match(
        resume_skills,
        job_skills
    )
# ==========================
# Explainable AI Module
# ==========================
@app.get("/explainable-ai")
def explainable_ai():

    resume_skills = [
        "python",
        "sql",
        "machine learning"
    ]

    job_skills = [
        "python",
        "sql",
        "aws",
        "docker"
    ]

    return explain_match(
        resume_skills,
        job_skills
    )



# ==========================
# Career Roadmap Generator
# ==========================

@app.get("/career-roadmap")
def career_roadmap(role: str):

    return generate_roadmap(role)

# ==========================
# Skill Consistency / Trust Score
# ==========================

@app.get("/trust-score")
def trust_score():

    claimed_skills = [
        "Python",
        "AWS",
        "Docker",
        "Machine Learning"
    ]

    project_text = """
    Developed a Python Machine Learning
    project for student prediction.
    """

    return calculate_trust_score(
        claimed_skills,
        project_text
    )

# ==========================
# Multi-Resume Comparison (Recruiter Module)
# ==========================
@app.get("/compare-resumes")
def compare_resumes():

    return compare_candidates()

# ==========================
# Job Market Trend Analyzer
# ==========================

@app.get("/market-trends")
def market_analysis():

    return market_trends()


# ==========================
# API DASHBOARD
# ==========================

@app.get("/dashboard")
def dashboard(text: str, role: str):

    result = ai_analyze_resume(text)

    skills = resume_result["skills_found"]

    skill_gap_result = find_skill_gap(
        skills,
        [
            "python",
            "sql",
            "aws",
            "docker",
            "machine learning"
        ]
    )

    match_result = calculate_match(
        skills,
        [
            "python",
            "sql",
            "aws",
            "docker"
        ]
    )

    explain_result = explain_match(
        skills,
        [
            "python",
            "sql",
            "aws",
            "docker"
        ]
    )

    roadmap_result = generate_roadmap(role)

    trust_result = calculate_trust_score(
        skills,
        text
    )

    career_result = predict_career(skills)

    
    return {
        "resume": resume_result,
        "skill_gap": skill_gap_result,
        "job_match": match_result,
        "explanation": explain_result,
        "roadmap": roadmap_result,
        "trust": trust_result,
        "career_prediction": career_result
    }


# ==========================
# Job MATCH API
# ==========================

@app.get("/job-description-match")
def job_description_match(
    resume_text: str,
    job_text: str
):

    resume_result = ai_analyze_resume(resume_text)
    

    resume_skills = resume_result[
        "skills_found"
    ]

    # Detect skills from JD
    job_result = ai_analyze_resume(job_text)

    detected_job_skills = job_result[
        "skills_found"
    ]

    # Additional JD keyword detection
    important_keywords = [

        "python",
        "sql",
        "aws",
        "azure",
        "gcp",
        "docker",
        "kubernetes",

        "machine learning",
        "deep learning",
        "nlp",
        "llm",

        "react",
        "angular",
        "vue",

        "java",
        "spring boot",

        "django",
        "flask",
        "fastapi",

        "power bi",
        "tableau",

        "git",
        "github",

        "agile",
        "scrum",

        "communication",
        "leadership"
    ]

    job_text_lower = job_text.lower()

    for skill in important_keywords:

        if (
            skill in job_text_lower
            and
            skill not in detected_job_skills
        ):
            detected_job_skills.append(skill)

    matched_skills = list(
        set(resume_skills)
        &
        set(detected_job_skills)
    )

    missing_skills = list(
        set(detected_job_skills)
        -
        set(resume_skills)
    )

    score = 0

    if len(detected_job_skills) > 0:

        score = round(

            (
                len(matched_skills)
                /
                len(detected_job_skills)
            ) * 100,

            2
        )

    return {

        "match_score": score,

        "resume_skills":
        resume_skills,

        "job_skills":
        detected_job_skills,

        "matched_skills":
        matched_skills,

        "missing_skills":
        missing_skills

    }
# ==========================
# Resume Comparison API
# ==========================
@app.get("/compare-two-resumes")
def compare_two_resumes(
    resume1: str,
    resume2: str
):

    

    result1 = ai_analyze_resume(resume1)
    result2 = ai_analyze_resume(resume2)

    score1 = result1["resume_score"]
    score2 = result2["resume_score"]

    skills1 = result1["skills_found"]
    skills2 = result2["skills_found"]

    skill_count1 = len(skills1)
    skill_count2 = len(skills2)

    final_score1 = score1 + skill_count1
    final_score2 = score2 + skill_count2

    common_skills = list(
        set(skills1).intersection(
            set(skills2)
        )
    )

    resume1_advantages = list(
        set(skills1).difference(
            set(skills2)
        )
    )

    resume2_advantages = list(
        set(skills2).difference(
            set(skills1)
        )
    )

    if final_score1 > final_score2:

        winner = "Resume 1"

    elif final_score2 > final_score1:

        winner = "Resume 2"

    else:

        winner = "Tie"

    return {

        "resume1_score": score1,
        "resume2_score": score2,

        "resume1_skill_count": skill_count1,
        "resume2_skill_count": skill_count2,

        "final_score_resume1": final_score1,
        "final_score_resume2": final_score2,

        "resume1_skills": skills1,
        "resume2_skills": skills2,

        "common_skills": common_skills,

        "resume1_advantages":
        resume1_advantages,

        "resume2_advantages":
        resume2_advantages,

        "winner": winner
    }


# ==========================
# Upload Resume API
# ==========================




from fastapi import Form, Depends
from sqlalchemy.orm import Session
from database import SessionLocal
from models import (
    User,
    Resume,
    Education,
    Experience,
    Certification,
    Notification,
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/upload-resume/")
async def upload_resume(
    user_id: int = Form(...),
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    try:

        # -------------------------------
        # Save uploaded PDF temporarily
        # -------------------------------
        with tempfile.NamedTemporaryFile(
            delete=False,
            suffix=".pdf"
        ) as temp:

            content = await file.read()
            temp.write(content)
            temp_path = temp.name

        # -------------------------------
        # Extract text
        # -------------------------------
        text = extract_text(temp_path)

        # -------------------------------
        # Analyze Resume
        # -------------------------------
        ai_result = ai_analyze_resume(text)
        
        analysis = ai_result

        role = ai_result.get(
            "detected_role",
            "software engineer"
        ).lower().strip()

        role_info = generate_roadmap(role)

        expected = role_info["skills"]

        recommended_tools = role_info["tools"]
        recommended_certifications = role_info["certifications"]
        salary_range = role_info["salary_range"]

        gap = find_skill_gap(
            analysis["skills_found"],
            expected
        )

        from recommended_focus import generate_recommended_focus
        
        recommended_focus = generate_recommended_focus(
            role,
            [x["skill"] for x in gap["missing_skills"]]
        )

        print("ROLE =", role)
        print("ROLE INFO =", role_info)
        
        detected = analysis["skills_found"]

        expected_lower = [x.lower() for x in expected]
        detected_lower = [x.lower() for x in detected]

        core_skills = [
            skill
            for skill in expected
            if skill.lower() in detected_lower
        ]

        missing_skills = [
            skill
            for skill in expected
            if skill.lower() not in detected_lower
        ]

        recommended_focus = generate_recommended_focus(
            role,
            missing_skills
        )
        

        additional_skills = [
            skill
            for skill in detected
            if skill.lower() not in expected_lower
        ]

        score = analysis["resume_score"]

        career_prediction = predict_career(
            analysis["skills_found"]
        )
        # -------------------------------
        # Career Level
        # -------------------------------
        if score >= 90:
            resume_rank = "Top 5%"
            career_level = "Job Ready"

        elif score >= 80:
            resume_rank = "Top 10%"
            career_level = "Advanced"

        elif score >= 70:
            resume_rank = "Top 25%"
            career_level = "Intermediate"

        elif score >= 60:
            resume_rank = "Top 50%"
            career_level = "Developing"

        else:
            resume_rank = "Needs Improvement"
            career_level = "Beginner"


    
        role = career_prediction["primary_role"]["role"]
        confidence = career_prediction["primary_role"]["confidence"]

        db.add(
            Notification(
                user_id=user_id,
                title="Career Prediction Ready",
                message=f"Your recommended career is {role.title()} ({confidence}% match).",
                type="career",
            )
        )

        db.commit()
     




        # -------------------------------
        # ATS Score
        # -------------------------------
        ats = calculate_ats_score(text)

        improvement_bonus = 0

        if ats["ats_score"] < 80:
            improvement_bonus += 5

        if len(detected) < 10:
            improvement_bonus += 5

        predicted_score = min(score + improvement_bonus, 100)



        db.add(
            Notification(
                user_id=user_id,
                title="ATS Score Updated",
                message=f"Your ATS score is {ats['ats_score']}.",
                type="ats"
            )
        )

        db.commit()



        # -------------------------------
        # Resume Report
        # -------------------------------
        report = generate_resume_report(
            analysis["skills_found"],
            "General",
            [],
            100
        )

        summary = ai_result["professional_summary"] 

        readiness_score = round(
            (
                analysis["resume_score"] +
                ats["ats_score"]
            ) / 2
        )

        ai_suggestions = generate_ai_suggestions(
            text,
            analysis["skills_found"]
        )

        learning_roadmap = generate_learning_roadmap(
            analysis["skills_found"]
        )

        # -------------------------------
        # Save Resume in Database
        # -------------------------------
    
        resume = Resume(

            user_id=user_id,

            resume_score=analysis["resume_score"],

            ats_score=ats["ats_score"],

            career_level=career_level,

            detected_role=role.title(),

            skills=",".join(analysis["skills_found"]),

            roadmap="\n".join(expected),
 
            ai_suggestions="\n".join(ai_suggestions)

        )
 
        db.add(resume)
        db.commit()
        
        print("Resume saved successfully!")
        print("Resume ID:", resume.id)

        db.refresh(resume)

        # -------------------------------
        # NOTIFICATIONS
        # -------------------------------


        

        db.add(
            Notification(
                user_id=user_id,
                title="Resume Analysis Complete",
                message="Your resume analysis has completed successfully.",
                type="resume"
            )
        )

        db.commit()
    



        # -------------------------------
        # Response
        # -------------------------------
        return {
            "success": True,
            "resume_text": text,
            "resume_id": resume.id,
            "filename": file.filename,

            **ai_result,

            "ats_score": ats["ats_score"],

            "issues": ats["issues"],

            "skill_gap": gap,

            "recommended_focus": recommended_focus,

            "recommendations": ats["recommendations"],

            "career_level": career_level,
            "resume_rank": resume_rank,

            "readiness_score": readiness_score,

            "career_roadmap": expected,

            "learning_roadmap": learning_roadmap,

            "ai_suggestions": ai_suggestions,

            "salary_range": salary_range,

            "recommended_tools": recommended_tools,

            "career_prediction": career_prediction,

            "recommended_certifications": recommended_certifications,
           
            "professional_summary": summary,
            
        }
    

    except Exception as e:
             print("UPLOAD ERROR:", e)

             return {
            "success": False,
            "error": str(e)
        }
    


@app.get("/score-trend")
def score_trend():

    db = SessionLocal()

    resumes = (
        db.query(Resume)
        .order_by(Resume.created_at.asc())
        .all()
    )


    return [
        {
            "month": str(r.id),
            "ats": r.ats_score,
            "resume": r.resume_score
        }

        for r in resumes
    ]
    
# ==========================
# Download PDF
# ==========================

@app.get("/download-report")
def download_report():

    pdf_file = "resume_report.pdf"

    c = canvas.Canvas(pdf_file)

    y = 800

    c.setFont("Helvetica-Bold", 18)
    c.drawString(50, y, "Career Intelligence Report")

    y -= 40

    c.setFont("Helvetica", 12)

    c.drawString(50, y, "Generated by Career AI")

    y -= 40

    c.drawString(50, y, "Resume Score: 75")

    y -= 25

    c.drawString(50, y, "ATS Score: 90")

    y -= 25

    c.drawString(50, y, "Career Readiness: 45%")

    y -= 40

    c.drawString(50, y, "Skills:")

    y -= 25

    c.drawString(
        70,
        y,
        "Python, SQL, Django, Git"
    )

    c.save()

    return FileResponse(
        pdf_file,
        filename="resume_report.pdf",
        media_type="application/pdf"
    )


from database import SessionLocal

@app.get("/candidate-dashboard")
def candidate_dashboard():

    db = SessionLocal()

    print("========== DASHBOARD ==========")
    
    all_resumes = db.query(Resume).all()

    print("Total resumes:", len(all_resumes))

    for r in all_resumes:
        print(r.id, r.detected_role)


    latest = (
        db.query(Resume)
        .order_by(Resume.id.desc())
        .first()
    )

    if not latest:
        return {
            "stats": {
                "resumeScore": 0,
                "atsScore": 0,
                "jobMatches": 0,
                "skillCoverage": 0
            },
            "aiInsights": [],
            "jobMatches": [],
            "recentActivity": [],
            "recentUploads": [],
            "interviews": []
        }

    skills = latest.skills.split(",") if latest.skills else []

    recommended = recommend_jobs(skills)

    matches = []

    for i, job in enumerate(recommended[:4]):
        matches.append({
            "id": i + 1,
            "logo": job["companies"][0][:2].upper(),
            "role": job["role"],
            "company": ", ".join(job["companies"]),
            "location": "India",
            "match": job["match"]
        })

    return {

        "stats": {

            "resumeScore": latest.resume_score,

            "atsScore": latest.ats_score,

            "jobMatches": len(matches),

            "skillCoverage": min(len(skills) * 10, 100)
        },

        "resumeBreakdown": {

            "keywords": min(100, len(skills) * 4),

            "grammar": 88,

            "impact": int(latest.resume_score)

        },
        "aiInsights": [

            {
                "title": "Detected Role",
                "detail": latest.detected_role,
                "tone": "success"
            },

            {
                "title": "Career Level",
                "detail": latest.career_level,
                "tone": "accent"
            },

            {
                "title": "AI Suggestion",
                "detail": latest.ai_suggestions.split("\n")[0]
                if latest.ai_suggestions else "",
                "tone": "warning"
            }
        ],

        "jobMatches": matches,

        "recentActivity": [
            {
                "id": 1,
                "actor": "Resume",
                "action": "uploaded successfully",
                "time": "Just now",
                "tone": "success"
            },

            {
                "id": 2,
                "actor": "ATS Engine",
                "action": f"scored {latest.ats_score}",
                "time": "Just now",
                "tone": "accent"
            },
     
            {
                "id": 3,
                "actor": "AI",
                "action": f"detected {latest.detected_role}",
                "time": "Just now",
                "tone": "warning"
            }
   
         ],

        "recentUploads": [
            {
                "id": latest.id,
                "name": latest.detected_role + " Resume",
                "size": f"{len(skills)} Skills",
                "when": "Latest Upload",
                "score": latest.resume_score
            }
        ],

       "interviews": [
            {
                "id": 1,
                "candidate": "AI Mock Interview",
                "role": latest.detected_role,
                "type": "Technical",
                "time": "Available Anytime"
            }
        ]
    }
# ==========================
# Resume Rewriter API
# ==========================

from pydantic import BaseModel

class RewriteRequest(BaseModel):
    resume_text: str
    target_role: str


@app.post("/rewrite-resume")
def rewrite(req: RewriteRequest):

    print("===== REWRITE API HIT =====")

    print(req.target_role)

    result = rewrite_resume(
        req.resume_text,
        req.target_role
    )

    print("Groq Finished")


    

    db.add(
        Notification(
            user_id=user_id,
            title="Resume Rewritten",
            message="AI finished rewriting your resume.",
            type="resume"
        )
    )

    db.commit()


    return result