def find_skill_gap(resume_skills, required_skills):

    resume_skills = [skill.lower() for skill in resume_skills]
    required_skills = [skill.lower() for skill in required_skills]

    missing = []

    for skill in required_skills:
        if skill not in resume_skills:
            missing.append(skill)

    return {
        "missing_skills": missing
    }