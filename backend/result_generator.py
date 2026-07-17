def generate_resume_report(
    skills,
    role,
    missing_skills,
    trust_score
):

    suggestions = []

    if trust_score < 50:
        suggestions.append(
            "Add more projects demonstrating your skills."
        )

    if len(missing_skills) > 0:
        suggestions.append(
            f"Learn {', '.join(missing_skills[:5])}"
        )

    strengths = []

    if "python" in skills:
        strengths.append(
            "Strong programming foundation"
        )

    if "react" in skills:
        strengths.append(
            "Frontend development capability"
        )

    if "aws" in skills:
        strengths.append(
            "Cloud engineering exposure"
        )

    return {

        "strengths":
        strengths,

        "suggestions":
        suggestions,

        "readiness_score":
        round(
            (
                len(skills) * 5
            ),
            2
        )
    }