def generate_ai_suggestions(text, skills):

    suggestions = []

    if len(skills) < 5:
        suggestions.append(
            "Add more domain-specific skills."
        )

    if "project" not in text.lower():
        suggestions.append(
            "Include project experience."
        )

    if "%" not in text:
        suggestions.append(
            "Quantify achievements with measurable impact."
        )

    if "linkedin" not in text.lower():
        suggestions.append(
            "Add LinkedIn profile."
        )

    if "github" not in text.lower():
        suggestions.append(
            "Add GitHub profile."
        )

    return suggestions