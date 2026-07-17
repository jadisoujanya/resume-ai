def calculate_ats_score(text):

    text_lower = text.lower()

    score = 0
    issues = []
    recommendations = []

    # Contact Information
    if "@" in text:
        score += 10
    else:
        issues.append("Email address missing")
        recommendations.append("Add a professional email address")

    # Phone Number
    digits = sum(c.isdigit() for c in text)

    if digits >= 10:
        score += 10
    else:
        issues.append("Phone number missing")
        recommendations.append("Add contact number")

    # Skills Section
    if "skills" in text_lower:
        score += 15
    else:
        issues.append("Skills section missing")
        recommendations.append("Add a dedicated skills section")

    # Experience
    if "experience" in text_lower:
        score += 20
    else:
        issues.append("Experience section missing")
        recommendations.append("Add work experience")

    # Education
    if "education" in text_lower:
        score += 15
    else:
        issues.append("Education section missing")
        recommendations.append("Add education details")

    # Projects
    if "project" in text_lower:
        score += 15
    else:
        issues.append("Projects section missing")
        recommendations.append("Add technical projects")

    # Certifications
    if "certification" in text_lower or "certifications" in text_lower:
        score += 10
    else:
        issues.append("Certifications missing")
        recommendations.append("Add certifications")

    # LinkedIn
    if "linkedin" in text_lower:
        score += 5
    else:
        recommendations.append("Add LinkedIn profile")

    ats_score = min(score, 100)

 
    # Word Count

    word_count = len(text.split())

    if word_count >= 300:
                        score += 5
    else:
        issues.append("Resume content too short")
        recommendations.append("Add more project and experience details")

        # Action Verbs

    action_words = [
    "developed",
    "designed",
    "implemented",
    "created",
    "built",
    "optimized"
]

    if any(word in text_lower for word in action_words):
                                                       score += 5
    else:
        recommendations.append(
        "Use action verbs like Developed, Built, Implemented"
    )
        
        # GitHub

    if "github" in text_lower:
                             score += 5
    else:
        recommendations.append(
        "Add GitHub profile"
    )
    return {
        "ats_score": ats_score,
        "issues": issues,
        "recommendations": recommendations
    }