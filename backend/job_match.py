def calculate_match(resume_skills, job_skills):

    resume = set(s.lower() for s in resume_skills)
    job = set(s.lower() for s in job_skills)

    matched = resume & job

    score = (len(matched) / len(job)) * 100

    return round(score)
