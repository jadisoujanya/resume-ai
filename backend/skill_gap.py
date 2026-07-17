def find_skill_gap(resume_skills, required_skills):

    resume_lower = [s.lower() for s in resume_skills]

    missing = []
    chart = []

    total = len(required_skills)

    for i, skill in enumerate(required_skills):

        has_skill = skill.lower() in resume_lower

        if not has_skill:

            if i < 2:
                priority = "high"
                roi = "+20%"
                progress = 15

            elif i < 4:
                priority = "medium"
                roi = "+12%"
                progress = 40

            else:
                priority = "low"
                roi = "+6%"
                progress = 70

            missing.append({
                "skill": skill,
                "priority": priority,
                "roi": roi,
                "progress": progress
            })

        chart.append({
            "skill": skill,
            "value": 100 if has_skill else 0,
            "target": 100
        })

    return {
        "missing_skills": missing,
        "skill_gap": chart
    }