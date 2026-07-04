def predict_career(skills):

    career_roles = {

        "Data Scientist": [
            "python","sql","statistics",
            "machine learning","deep learning",
            "pandas","numpy"
        ],

        "AI Engineer": [
            "python","machine learning",
            "deep learning","tensorflow",
            "pytorch","llms"
        ],

        "Data Analyst": [
            "excel","sql","python",
            "power bi","tableau"
        ],

        "Backend Developer": [
            "python","django","fastapi",
            "sql","docker","aws"
        ],

        "Frontend Developer": [
            "html","css","javascript",
            "react","typescript"
        ],

        "Full Stack Developer": [
            "html","css","javascript",
            "react","node.js","sql"
        ],

        "DevOps Engineer": [
            "docker","kubernetes",
            "aws","terraform","linux"
        ],

        "Machine Learning Engineer": [
            "python","machine learning",
            "tensorflow","pytorch"
        ],

        "Cyber Security Analyst": [
            "network security",
            "ethical hacking",
            "linux",
            "penetration testing"
        ],

        "UI/UX Designer": [
            "figma",
            "wireframing",
            "prototyping"
        ],

        "Cloud Engineer": [
            "aws",
            "azure",
            "gcp",
            "docker",
            "kubernetes"
        ],

        "NLP Engineer": [
            "python",
            "nlp",
            "transformers",
            "llms"
        ],

        "Business Analyst": [
            "excel",
            "sql",
            "communication",
            "power bi"
        ],

        "Software Engineer": [
            "java",
            "python",
            "algorithms",
            "oop",
            "git"
        ],

        "QA Engineer": [
            "selenium",
            "manual testing",
            "api testing"
        ],

        "Android Developer": [
            "java",
            "kotlin",
            "android sdk"
        ],

        "iOS Developer": [
            "swift",
            "ios sdk",
            "xcode"
        ],

        "Blockchain Developer": [
            "solidity",
            "ethereum",
            "web3"
        ]
    }

    results = []

    for role, role_skills in career_roles.items():

        matched = len(
            set(skills).intersection(role_skills)
        )

        score = round(
            (matched / len(role_skills)) * 100,
            2
        )

        results.append({
            "role": role,
            "score": score
        })

    results.sort(
        key=lambda x: x["score"],
        reverse=True
    )

    return results[:5]