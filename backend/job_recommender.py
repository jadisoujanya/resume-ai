from data.jobs import JOBS


def recommend_jobs(resume_skills):
    recommendations = []

    for job in JOBS:
        # Some jobs use "skills", others use "required_skills"
        job_skills = job.get("skills") or job.get("required_skills", [])

        match = calculate_match(
            resume_skills,
            job_skills
        )

        if match >= 35:
            recommendations.append({
                **job,
                "match": match
            })

    recommendations.sort(
        key=lambda x: x["match"],
        reverse=True
    )

    return recommendations[:5]


def calculate_match(resume_skills, job_skills):
    resume = set(skill.lower() for skill in resume_skills)
    job = set(skill.lower() for skill in job_skills)

    matched = resume & job

    if len(job) == 0:
        return 0

    return round((len(matched) / len(job)) * 100)