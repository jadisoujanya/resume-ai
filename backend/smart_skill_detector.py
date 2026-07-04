import re

def detect_unknown_skills(text):

    words = re.findall(
        r'\b[A-Z][a-zA-Z0-9+#.-]+\b',
        text
    )

    ignore = [
        "I",
        "My",
        "Project",
        "University",
        "College"
    ]

    detected = []

    for word in words:

        if word not in ignore:

            if len(word) > 2:

                detected.append(word)

    return list(set(detected))