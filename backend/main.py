from fastapi import FastAPI
from fastapi import UploadFile, File
from pdfminer.high_level import extract_text
import tempfile
from resume_analyzer import analyze_resume
from skill_gap import find_skill_gap
from job_match import calculate_match
from explainable_ai import explain_match
from career_roadmap import (
    generate_roadmap,
    detect_resume_role,
    roadmaps
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
from resume_suggestions import generate_ai_suggestions
import re


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

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {
        "message": "Career AI Backend Running Successfully"
    }


# ==========================
# Resume Analysis Module
# ==========================
@app.get("/analyze")
def analyze(text: str):

    result = analyze_resume(text)

    return result


# ==========================
# Skill Gap Detection Module
# ==========================
@app.get("/skill-gap")
def skill_gap():

    resume_skills = [
        "python",
        "sql"
    ]

    required_skills = [
        "python",
        "sql",
        "aws",
        "docker"
    ]

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

    resume_result = analyze_resume(text)

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

    resume_result = analyze_resume(
        resume_text
    )

    resume_skills = resume_result[
        "skills_found"
    ]

    # Detect skills from JD
    job_result = analyze_resume(
        job_text
    )

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

    result1 = analyze_resume(resume1)

    result2 = analyze_resume(resume2)

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

@app.post("/upload-resume/")
async def upload_resume(file: UploadFile = File(...)):

    try:

        print("STEP 1")

        with tempfile.NamedTemporaryFile(
            delete=False,
            suffix=".pdf"
        ) as temp:

            content = await file.read()

            temp.write(content)

            temp_path = temp.name

        print("STEP 2")

        text = extract_text(temp_path)

        print("STEP 3")

        analysis = analyze_resume(text)

        role = detect_resume_role(text)
        if role is None:
            role = "software engineer"

        roadmap = generate_roadmap(role)["roadmap"]
        
        expected = roadmaps[role]["skills"]
        
        detected = analysis["skills_found"]

        expected_lower = [s.lower() for s in expected]
        detected_lower = [s.lower() for s in detected]

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

        additional_skills = [
        skill
        for skill in detected
        if skill.lower() not in expected_lower
    ]


        score = analysis["resume_score"]

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
        
        ats = calculate_ats_score(text)

        improvement_bonus = 0

        if ats["ats_score"] < 80:
           improvement_bonus += 5

        if len(analysis["skills_found"]) < 10:
           improvement_bonus += 5

        if score >= 90:
            predicted_score = score
        else:
            predicted_score = min(
        score + improvement_bonus,
        100
    )
            

    
        print("STEP 4")

        report = generate_resume_report(
            analysis["skills_found"],
            "General",
            [],
            100
        )


        print("STEP 5")

        summary = extract_summary(text)

        print("STEP 6")

        
        readiness = round(
(
analysis["resume_score"] +
ats["ats_score"]
) / 2
)
        ai_suggestions = generate_ai_suggestions(
    text,
    analysis["skills_found"]
)
        
        roadmap = generate_roadmap(role)["roadmap"]
        

        return {

    "filename": file.filename,

    "resume_score": analysis["resume_score"],

    "resume_rank": resume_rank,

    "predicted_score": predicted_score,

    "score_improvement": predicted_score - score,
    
    "career_level": career_level,

    "skills_found": analysis["skills_found"],

    "detected_role": role.title(),

    "core_skills": core_skills,

    "missing_skills": missing_skills,
     
    "additional_skills": additional_skills,

    "salary_range": roadmaps[role]["salary_range"],

    "recommended_certifications": roadmaps[role]["certifications"],

    "recommended_tools": roadmaps[role]["tools"],

    "strengths": report["strengths"],

    "suggestions": report["suggestions"],

    "readiness_score": report["readiness_score"],

    "professional_summary": summary,

    "ats_score": ats["ats_score"],

    "ats_issues": ats["issues"],

    "ats_recommendations": ats["recommendations"],

    "total_skills": len(
        analysis["skills_found"]
    ),

    "learning_roadmap": roadmap,
    "ai_suggestions": ai_suggestions,
    
}

    except Exception as e:

        print("UPLOAD ERROR:")
        print(e)

        return {
            "error": str(e)
        }
    

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