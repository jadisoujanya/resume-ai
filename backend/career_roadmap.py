# ==========================
# Career Roadmap Database
# ==========================

roadmaps = {

    "data scientist": {
        "skills": ["Python", "SQL", "Statistics", "Machine Learning", "Deep Learning", "Pandas", "NumPy", "Feature Engineering", "Data Visualization"],
        "tools": ["Jupyter", "Power BI", "Tableau", "Git"],
        "certifications": ["Google Data Analytics", "IBM Data Science"],
        "salary_range": "8 LPA - 25 LPA"
    },

    "ai engineer": {
        "skills": ["Python", "Machine Learning", "Deep Learning", "TensorFlow", "PyTorch", "LLMs", "MLOps", "Model Deployment"],
        "tools": ["Docker", "Kubernetes", "AWS", "FastAPI"],
        "certifications": ["Deep Learning Specialization", "AWS ML Specialty"],
        "salary_range": "10 LPA - 40 LPA"
    },

    "data analyst": {
        "skills": ["Excel", "SQL", "Python", "Power BI", "Tableau", "Data Cleaning", "EDA"],
        "tools": ["Power BI", "Excel", "Tableau"],
        "certifications": ["Google Data Analytics", "Microsoft Data Analyst Associate"],
        "salary_range": "4 LPA - 12 LPA"
    },

    "backend developer": {
        "skills": ["Python", "FastAPI", "Django", "REST APIs", "SQL", "Docker", "AWS", "System Design"],
        "tools": ["Postman", "Git", "Docker", "Linux"],
        "certifications": ["AWS Certified Developer", "Backend Engineering Bootcamp"],
        "salary_range": "6 LPA - 20 LPA"
    },

    "frontend developer": {
        "skills": ["HTML", "CSS", "JavaScript", "React", "TypeScript", "Redux", "Responsive Design"],
        "tools": ["VS Code", "Git", "Figma"],
        "certifications": ["Meta Frontend Developer", "FreeCodeCamp Frontend Cert"],
        "salary_range": "5 LPA - 18 LPA"
    },

    "full stack developer": {
        "skills": ["HTML", "CSS", "JavaScript", "React", "Node.js", "FastAPI", "MongoDB", "SQL", "System Design"],
        "tools": ["Git", "Docker", "Postman"],
        "certifications": ["Full Stack Open", "AWS Certified Developer"],
        "salary_range": "8 LPA - 25 LPA"
    },

    "devops engineer": {
        "skills": ["Linux", "CI/CD", "Docker", "Kubernetes", "AWS", "Terraform", "Monitoring"],
        "tools": ["Jenkins", "GitHub Actions", "Docker", "K8s"],
        "certifications": ["AWS DevOps Engineer", "Kubernetes CKA"],
        "salary_range": "8 LPA - 35 LPA"
    },

    "machine learning engineer": {
        "skills": ["Python", "Machine Learning", "Deep Learning", "PyTorch", "TensorFlow", "MLOps", "Feature Engineering"],
        "tools": ["MLflow", "Docker", "AWS", "Git"],
        "certifications": ["Deep Learning Specialization", "Google ML Engineer Certificate"],
        "salary_range": "10 LPA - 45 LPA"
    },

    "cyber security analyst": {
        "skills": ["Networking", "Linux", "Ethical Hacking", "SIEM", "Penetration Testing"],
        "tools": ["Wireshark", "Metasploit", "Nmap"],
        "certifications": ["CEH", "CompTIA Security+"],
        "salary_range": "6 LPA - 25 LPA"
    },

    "ui/ux designer": {
        "skills": ["Figma", "Wireframing", "User Research", "Prototyping", "Design Systems"],
        "tools": ["Figma", "Adobe XD", "Notion"],
        "certifications": ["Google UX Design Certificate"],
        "salary_range": "4 LPA - 15 LPA"
    },

    "cloud engineer": {
        "skills": ["AWS", "Azure", "GCP", "Linux", "Networking", "CI/CD", "Docker", "Kubernetes", "Terraform"],
        "tools": ["AWS Console", "Terraform", "Docker", "Kubernetes"],
        "certifications": ["AWS Solutions Architect", "Azure Administrator", "Google Cloud Engineer"],
        "salary_range": "8 LPA - 30 LPA"
    },

    "nlp engineer": {
        "skills": ["Python", "NLP", "Transformers", "LLMs", "Hugging Face", "Deep Learning", "Text Preprocessing"],
        "tools": ["PyTorch", "TensorFlow", "SpaCy", "HuggingFace"],
        "certifications": ["Deep Learning Specialization", "NLP with Transformers"],
        "salary_range": "10 LPA - 45 LPA"
    },

    "business analyst": {
        "skills": ["Excel", "SQL", "Requirement Analysis", "Data Visualization", "Problem Solving", "Communication"],
        "tools": ["Excel", "Power BI", "Tableau", "JIRA"],
        "certifications": ["CBAP", "Google Business Analytics"],
        "salary_range": "5 LPA - 18 LPA"
    },

    "software engineer": {
        "skills": ["Data Structures", "Algorithms", "OOP", "System Design", "Problem Solving", "Version Control"],
        "tools": ["Git", "Linux", "VS Code"],
        "certifications": ["DSA Bootcamp", "System Design Course"],
        "salary_range": "6 LPA - 35 LPA"
    },

    "qa engineer": {
        "skills": ["Manual Testing", "Automation Testing", "Selenium", "API Testing", "Test Case Design"],
        "tools": ["Selenium", "Postman", "JIRA"],
        "certifications": ["ISTQB Certification"],
        "salary_range": "4 LPA - 12 LPA"
    },

    "android developer": {
        "skills": ["Kotlin", "Java", "Android SDK", "UI Design", "REST APIs", "Firebase"],
        "tools": ["Android Studio", "Firebase", "Git"],
        "certifications": ["Google Android Developer Certificate"],
        "salary_range": "5 LPA - 20 LPA"
    },

    "ios developer": {
        "skills": ["Swift", "iOS SDK", "Xcode", "UI/UX Design", "REST APIs"],
        "tools": ["Xcode", "Git", "Firebase"],
        "certifications": ["Apple Developer Certification"],
        "salary_range": "6 LPA - 25 LPA"
    },

    "blockchain developer": {
        "skills": ["Solidity", "Smart Contracts", "Ethereum", "Web3", "Cryptography"],
        "tools": ["Hardhat", "Remix", "MetaMask"],
        "certifications": ["Blockchain Developer Certification"],
        "salary_range": "8 LPA - 40 LPA"
    }
}

# ==========================
# Role Aliases
# ==========================

ROLE_ALIASES = {

    # Frontend
    "frontend software engineer": "frontend developer",
    "front-end developer": "frontend developer",
    "frontend engineer": "frontend developer",
    "react developer": "frontend developer",

    # Backend
    "backend software engineer": "backend developer",
    "python developer": "backend developer",
    "django developer": "backend developer",

    # AI
    "artificial intelligence engineer": "ai engineer",
    "ai developer": "ai engineer",

    # ML
    "ml engineer": "machine learning engineer",
    "machine learning engineer": "machine learning engineer",

    # Generic
    "software developer": "software engineer",
    "developer": "software engineer",
}

# ==========================
# Generate Roadmap
# ==========================

def generate_roadmap(role: str):

    role = role.lower().strip()

    role = ROLE_ALIASES.get(role, role)

    return roadmaps.get(role, roadmaps["software engineer"])

# ==========================
# Detect Resume Role
# ==========================

def detect_resume_role(text: str):

    text = text.lower()

    # direct match
    for role in roadmaps.keys():
        if role in text:
            return role

    # alias match
    for alias, actual in ROLE_ALIASES.items():
        if alias in text:
            return actual

    return "software engineer"