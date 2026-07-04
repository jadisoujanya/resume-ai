def calculate_match(resume_skills, job_skills):

    resume_set = set(skill.lower() for skill in resume_skills)
    job_set = set(skill.lower() for skill in job_skills)

    matched = resume_set.intersection(job_set)

    score = (len(matched) / len(job_set)) * 100

    return {
        "match_score": round(score, 2),
        "matched_skills": list(matched),
        "missing_skills": list(job_set - resume_set)
    }