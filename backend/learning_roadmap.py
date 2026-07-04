def generate_learning_roadmap(skills):

    roadmap = []

    if "python" in [s.lower() for s in skills]:
        roadmap.append("Advanced Python")

    if "sql" in [s.lower() for s in skills]:
        roadmap.append("Database Optimization")

    if "html" in [s.lower() for s in skills]:
        roadmap.append("Frontend Development")

    roadmap.append("System Design")
    roadmap.append("Interview Preparation")

    return roadmap