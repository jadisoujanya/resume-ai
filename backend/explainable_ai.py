def explain_match(resume_skills, job_skills):

    explanation = []

    matched = set(resume_skills).intersection(set(job_skills))
    missing = set(job_skills) - set(resume_skills)

    for skill in matched:
        explanation.append(
            f"{skill} matches job requirement → increases hiring score"
        )

    for skill in missing:
        explanation.append(
            f"{skill} missing → reduces job compatibility"
        )

    return {
        "matched_skills": list(matched),
        "missing_skills": list(missing),
        "explanation": explanation
    }