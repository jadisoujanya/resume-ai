def calculate_trust_score(claimed_skills, project_text):

    project_text = project_text.lower()

    supported = []
    unsupported = []

    for skill in claimed_skills:

        if skill.lower() in project_text:
            supported.append(skill)

        else:
            unsupported.append(skill)

    trust_score = (
        len(supported) / len(claimed_skills)
    ) * 100

    return {
        "trust_score": round(trust_score, 2),
        "supported_skills": supported,
        "unsupported_skills": unsupported
    }