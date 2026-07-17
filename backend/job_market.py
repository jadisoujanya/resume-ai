def market_trends():

    trending_skills = {

        "Python": 95,
        "AWS": 90,
        "Docker": 85,
        "Machine Learning": 88,
        "SQL": 80,
        "Power BI": 75,
        "React": 78,
        "FastAPI": 72
    }

    sorted_skills = sorted(
        trending_skills.items(),
        key=lambda x: x[1],
        reverse=True
    )

    return {
        "top_trending_skills": sorted_skills
    }