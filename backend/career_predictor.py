from career_database import CAREER_DATABASE
def predict_career(skills):


    predictions = []

    detected = [s.lower() for s in skills]

    for role, data in CAREER_DATABASE.items():

        role_skills = [s.lower() for s in data["skills"]]

        matched = len(set(detected) & set(role_skills))

        skill_score = matched / len(role_skills)

        keyword_bonus = 0

        resume_text = " ".join(detected)

        if role.lower() in resume_text:
            keyword_bonus += 0.15

        confidence = min(
            round((skill_score + keyword_bonus) * 100),
            99
        )

        predictions.append({

            "role": role,

            "confidence": confidence,

            "description": data["description"],

            "salary": data["salary"],

            "growth": data["growth"],

            "jobs": data["jobs"],

            "reason": data["reason"],

            "projectOutputs": data.get("projectOutputs", [])

        })

    predictions.sort(
        key=lambda x: x["confidence"],
        reverse=True
    )

    return {

        "primary_role": predictions[0],

        "alternative_roles": predictions[1:5]

    }