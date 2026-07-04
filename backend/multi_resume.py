def compare_candidates():

    candidates = {

        "Candidate A": [
            "python",
            "sql",
            "aws"
        ],

        "Candidate B": [
            "python",
            "sql"
        ],

        "Candidate C": [
            "python",
            "sql",
            "aws",
            "docker",
            "machine learning"
        ]
    }

    job_requirements = [
        "python",
        "sql",
        "aws",
        "docker"
    ]

    results = []

    for name, skills in candidates.items():

        matched = len(
            set(skills).intersection(
                set(job_requirements)
            )
        )

        score = (
            matched / len(job_requirements)
        ) * 100

        results.append({
            "candidate": name,
            "score": round(score, 2)
        })

    results.sort(
        key=lambda x: x["score"],
        reverse=True
    )

    return results