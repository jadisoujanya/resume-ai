def generate_feedback(skills):

    suggestions = []

    if "git" not in skills:
        suggestions.append(
            "Add Git experience"
        )

    if "sql" not in skills:
        suggestions.append(
            "Learn SQL"
        )

    if "aws" not in skills:
        suggestions.append(
            "Learn AWS"
        )

    return suggestions