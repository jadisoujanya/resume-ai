// Mock data for Career Intelligence & Smart Hiring System
export const STATS_CANDIDATE = [
  { label: "Resume Score", value: 87, unit: "/100", trend: "+4.2%", tone: "primary" as const, icon: "FileText" },
  { label: "ATS Compatibility", value: 92, unit: "%", trend: "+1.8%", tone: "success" as const, icon: "ShieldCheck" },
  { label: "Job Matches", value: 24, unit: "", trend: "+6 new", tone: "accent" as const, icon: "Target" },
  { label: "Skill Coverage", value: 78, unit: "%", trend: "+3.1%", tone: "warning" as const, icon: "Sparkles" },
];

export const STATS_RECRUITER = [
  { label: "Active Candidates", value: 1284, unit: "", trend: "+124", tone: "primary" as const, icon: "Users" },
  { label: "Shortlisted", value: 86, unit: "", trend: "+12", tone: "success" as const, icon: "UserCheck" },
  { label: "Open Roles", value: 17, unit: "", trend: "3 urgent", tone: "warning" as const, icon: "Briefcase" },
  { label: "Avg Match Score", value: 74.6, unit: "%", trend: "+2.1%", tone: "accent" as const, icon: "TrendingUp" },
];

export const SKILL_RADAR = [
  { skill: "Python", value: 92, target: 90 },
  { skill: "ML/AI", value: 84, target: 85 },
  { skill: "System Design", value: 68, target: 80 },
  { skill: "Data Structures", value: 88, target: 85 },
  { skill: "Cloud", value: 62, target: 75 },
  { skill: "Communication", value: 79, target: 80 },
];

export const ATS_TREND = Array.from({ length: 12 }).map((_, i) => ({
  month: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][i],
  ats: 60 + Math.round(Math.sin(i / 2) * 8 + i * 1.6),
  resume: 55 + Math.round(Math.cos(i / 2) * 6 + i * 1.4),
}));

export const SKILL_DEMAND = [
  { skill: "Python", demand: 94, supply: 62 },
  { skill: "React", demand: 88, supply: 71 },
  { skill: "AWS", demand: 82, supply: 48 },
  { skill: "TensorFlow", demand: 76, supply: 38 },
  { skill: "Kubernetes", demand: 71, supply: 34 },
  { skill: "SQL", demand: 90, supply: 78 },
  { skill: "Docker", demand: 74, supply: 55 },
];

export const HIRING_FUNNEL = [
  { stage: "Applied", value: 4820 },
  { stage: "Screened", value: 1284 },
  { stage: "Shortlisted", value: 386 },
  { stage: "Interviewed", value: 142 },
  { stage: "Offered", value: 48 },
  { stage: "Hired", value: 32 },
];

export const SKILL_DISTRIBUTION = [
  { name: "AI / ML", value: 32 },
  { name: "Frontend", value: 24 },
  { name: "Backend", value: 22 },
  { name: "DevOps", value: 12 },
  { name: "Data", value: 10 },
];

export const RECENT_ACTIVITY = [
  { id: 1, actor: "AI Career Coach", action: "suggested 3 new roles matching your profile", time: "2m ago", tone: "primary" },
  { id: 2, actor: "Resume Analyzer", action: "increased your ATS score from 84 to 92", time: "1h ago", tone: "success" },
  { id: 3, actor: "System", action: "found 6 new job matches in Bengaluru", time: "3h ago", tone: "accent" },
  { id: 4, actor: "Skill Gap Analyzer", action: "identified Kubernetes as a growth area", time: "yesterday", tone: "warning" },
  { id: 5, actor: "Mock Interview", action: "completed session — score 8.4/10", time: "yesterday", tone: "primary" },
];

export const JOB_MATCHES = [
  { id: 1, role: "Senior ML Engineer", company: "Nimbus Labs", location: "Bengaluru · Hybrid", salary: "₹42–58 LPA", match: 94, tags: ["Python", "PyTorch", "MLOps"], logo: "N" },
  { id: 2, role: "Staff Data Scientist", company: "Vercel", location: "Remote", salary: "$180–220K", match: 91, tags: ["LLMs", "SQL", "Airflow"], logo: "V" },
  { id: 3, role: "AI Research Engineer", company: "Anthem AI", location: "Hyderabad", salary: "₹36–48 LPA", match: 88, tags: ["Transformers", "CUDA"], logo: "A" },
  { id: 4, role: "Full-Stack + AI Dev", company: "Loop", location: "Remote", salary: "$120–150K", match: 84, tags: ["React", "FastAPI", "OpenAI"], logo: "L" },
  { id: 5, role: "MLOps Lead", company: "Kernel Cloud", location: "Pune", salary: "₹32–42 LPA", match: 82, tags: ["K8s", "MLflow", "AWS"], logo: "K" },
];

export const CANDIDATES = [
  { id: 1, name: "Ananya Sharma", role: "ML Engineer", exp: "4.2 yrs", ats: 94, match: 96, skills: ["Python", "PyTorch", "AWS"], location: "Bengaluru", trust: 92, avatar: "AS" },
  { id: 2, name: "Rahul Verma", role: "Full-Stack Dev", exp: "5.1 yrs", ats: 89, match: 88, skills: ["React", "Node", "GraphQL"], location: "Pune", trust: 87, avatar: "RV" },
  { id: 3, name: "Priya Nair", role: "Data Scientist", exp: "3.6 yrs", ats: 91, match: 92, skills: ["SQL", "Spark", "LLMs"], location: "Hyderabad", trust: 90, avatar: "PN" },
  { id: 4, name: "Kabir Singh", role: "DevOps Engineer", exp: "6.0 yrs", ats: 85, match: 84, skills: ["K8s", "Terraform", "AWS"], location: "Remote", trust: 88, avatar: "KS" },
  { id: 5, name: "Meera Iyer", role: "Product Engineer", exp: "2.8 yrs", ats: 87, match: 81, skills: ["TypeScript", "Next.js"], location: "Chennai", trust: 84, avatar: "MI" },
  { id: 6, name: "Arjun Rao", role: "AI Researcher", exp: "3.4 yrs", ats: 93, match: 90, skills: ["Transformers", "JAX"], location: "Bengaluru", trust: 91, avatar: "AR" },
];

export const INTERVIEWS = [
  { id: 1, candidate: "Ananya Sharma", role: "ML Engineer", time: "Today · 3:30 PM", type: "Technical", panel: 3 },
  { id: 2, candidate: "Rahul Verma", role: "Full-Stack Dev", time: "Tomorrow · 11:00 AM", type: "System Design", panel: 2 },
  { id: 3, candidate: "Priya Nair", role: "Data Scientist", time: "Fri · 5:00 PM", type: "HR + Culture", panel: 2 },
];

export const AI_INSIGHTS = [
  { title: "Your resume beats 92% of applicants for ML roles", detail: "Strong keyword coverage on PyTorch, distributed training, MLOps.", tone: "success" as const },
  { title: "Add 2 quantified impact bullets to boost ATS by ~6 points", detail: "Recruiters look for outcomes (%, $, users, latency).", tone: "warning" as const },
  { title: "Kubernetes is trending +38% in your target market", detail: "Recommended learning path: CKAD in 6 weeks.", tone: "info" as const },
];

export const RECENT_UPLOADS = [
  { id: 1, name: "Ananya_Sharma_Resume.pdf", size: "312 KB", when: "2m ago", status: "Analyzed", score: 94 },
  { id: 2, name: "Rahul_V_CV_v3.pdf", size: "284 KB", when: "18m ago", status: "Analyzed", score: 89 },
  { id: 3, name: "priya-nair-2026.pdf", size: "402 KB", when: "1h ago", status: "Analyzed", score: 91 },
  { id: 4, name: "Kabir_Singh.pdf", size: "268 KB", when: "3h ago", status: "Processing", score: null },
];

export const EXTRACTED_SKILLS = [
  { skill: "Python", level: 95, category: "Language" },
  { skill: "PyTorch", level: 88, category: "ML Framework" },
  { skill: "TensorFlow", level: 76, category: "ML Framework" },
  { skill: "AWS SageMaker", level: 72, category: "Cloud" },
  { skill: "Docker", level: 84, category: "DevOps" },
  { skill: "Kubernetes", level: 58, category: "DevOps" },
  { skill: "FastAPI", level: 90, category: "Backend" },
  { skill: "PostgreSQL", level: 82, category: "Database" },
  { skill: "Airflow", level: 68, category: "Data" },
  { skill: "LangChain", level: 74, category: "AI" },
];

export const MISSING_SKILLS = [
  { skill: "Kubernetes (Advanced)", impact: "high", roles: 34 },
  { skill: "Distributed Training", impact: "high", roles: 22 },
  { skill: "Ray / Dask", impact: "medium", roles: 14 },
  { skill: "Model Monitoring", impact: "medium", roles: 18 },
];

export type CareerPath = {
  key: string;
  title: string;
  emoji: string;
  confidence: number;
  growth: string;
  median: string;
  openings: string;
  summary: string;
  outcome: string;
  projectOutputs: { title: string; detail: string }[];
};

export const CAREER_PATHS: CareerPath[] = [
  {
    key: "data-scientist",
    title: "Data Scientist",
    emoji: "🧠",
    confidence: 94,
    growth: "+32%",
    median: "₹26 LPA",
    openings: "3.1k",
    summary:
      "A Data Scientist transforms raw and complex datasets into actionable insights through statistical analysis, machine learning models, and data visualization. The role focuses on discovering patterns, building predictive models, and supporting decision-making across business functions.",
    outcome:
      "Enables data-driven decision-making through predictive models, analytical insights, and structured reporting systems.",
    projectOutputs: [
      { title: "EDA Report", detail: "Structured data exploration with insights, patterns, and visual storytelling." },
      { title: "ML Prediction System", detail: "Trained model that predicts outcomes from real-world datasets." },
      { title: "End-to-end DS Product", detail: "Full pipeline from data cleaning → model → deployment → dashboard / API." },
    ],
  },
  {
    key: "ai-engineer",
    title: "AI Engineer",
    emoji: "🤖",
    confidence: 91,
    growth: "+48%",
    median: "₹32 LPA",
    openings: "2.4k",
    summary:
      "An AI Engineer develops and deploys intelligent systems capable of performing tasks such as reasoning, language understanding, and automation. The role focuses on building scalable AI solutions using deep learning, LLMs, and production-grade architectures.",
    outcome:
      "Enables deployment of intelligent AI systems such as conversational agents, automation tools, and large-scale machine learning applications.",
    projectOutputs: [
      { title: "AI Chatbot", detail: "Intelligent conversational system using NLP / LLMs with contextual responses." },
      { title: "Image / Text Model", detail: "Deep learning model for classification, generation, or understanding tasks." },
      { title: "Production AI System", detail: "Scalable AI service with APIs, deployment, and real-time inference." },
    ],
  },
  {
    key: "data-analyst",
    title: "Data Analyst",
    emoji: "📊",
    confidence: 86,
    growth: "+18%",
    median: "₹14 LPA",
    openings: "4.6k",
    summary:
      "A Data Analyst collects, processes, and interprets structured data to identify trends and support business decision-making. The role focuses on reporting, dashboard creation, and performance analysis using statistical and visualization tools.",
    outcome:
      "Enables business performance tracking through dashboards, reports, and actionable analytical insights.",
    projectOutputs: [
      { title: "Dashboard Reports", detail: "Interactive dashboards showing KPIs, trends, and business metrics." },
      { title: "Business Insights Project", detail: "Data-driven analysis with actionable recommendations." },
      { title: "KPI Tracking System", detail: "Automated system to monitor and visualize performance metrics." },
    ],
  },
  {
    key: "backend-developer",
    title: "Backend Developer",
    emoji: "💻",
    confidence: 78,
    growth: "+21%",
    median: "₹22 LPA",
    openings: "5.2k",
    summary:
      "A Backend Developer designs and maintains the server-side logic, databases, and APIs that power applications. The role ensures that systems are secure, scalable, and efficient in handling user requests and data processing.",
    outcome:
      "Enables reliable application functionality through APIs, database systems, and scalable server-side architectures.",
    projectOutputs: [
      { title: "REST / GraphQL API", detail: "Secure, versioned API layer with auth, validation and rate limiting." },
      { title: "Database Design", detail: "Normalized schema, indexes, and query optimization for scale." },
      { title: "Scalable Service", detail: "Containerized service with caching, queues, and observability." },
    ],
  },
  {
    key: "frontend-developer",
    title: "Frontend Developer",
    emoji: "🎨",
    confidence: 74,
    growth: "+16%",
    median: "₹18 LPA",
    openings: "4.9k",
    summary:
      "A Frontend Developer builds the visual and interactive components of web applications that users directly engage with. The role focuses on translating UI / UX designs into responsive and functional interfaces.",
    outcome:
      "Enables interactive and responsive user experiences through modern web interfaces and component-based UI systems.",
    projectOutputs: [
      { title: "Responsive Web App", detail: "Pixel-accurate UI implementation with accessibility baked in." },
      { title: "Component Library", detail: "Reusable design-system components with docs and tokens." },
      { title: "Performance Optimized SPA", detail: "Sub-second interactive experience with code-splitting and caching." },
    ],
  },
  {
    key: "full-stack-developer",
    title: "Full Stack Developer",
    emoji: "⚙️",
    confidence: 82,
    growth: "+24%",
    median: "₹24 LPA",
    openings: "3.8k",
    summary:
      "A Full Stack Developer handles both frontend and backend development to build complete web applications. The role involves integrating user interfaces, server logic, and databases into a unified system.",
    outcome:
      "Enables end-to-end application development through integration of frontend interfaces, backend systems, and databases.",
    projectOutputs: [
      { title: "End-to-end Web Product", detail: "Frontend + backend + database wired into a single shippable product." },
      { title: "Auth & Payments Flow", detail: "Complete user lifecycle with secure auth and transactions." },
      { title: "Admin Dashboard", detail: "Internal tooling with role-based access and analytics." },
    ],
  },
  {
    key: "devops-engineer",
    title: "DevOps Engineer",
    emoji: "☁️",
    confidence: 71,
    growth: "+41%",
    median: "₹28 LPA",
    openings: "1.9k",
    summary:
      "A DevOps Engineer automates software deployment, infrastructure management, and system monitoring. The role focuses on improving collaboration between development and operations teams while ensuring system reliability.",
    outcome:
      "Enables automated software delivery and reliable system operations through CI/CD pipelines and infrastructure automation.",
    projectOutputs: [
      { title: "CI/CD Pipeline", detail: "Automated build, test, and deploy pipeline across environments." },
      { title: "Infrastructure as Code", detail: "Reproducible cloud infra using Terraform / Pulumi." },
      { title: "Observability Stack", detail: "Metrics, logs, and traces with dashboards and alerts." },
    ],
  },
];

export type RoadmapLevel = "Beginner" | "Intermediate" | "Advanced";
export type RoadmapTopic = { icon: string; name: string; summary: string; covers: string[]; goal: string };
export type RoleRoadmap = {
  key: string;
  role: string;
  emoji: string;
  tagline: string;
  levels: { level: RoadmapLevel; weeks: string; topics: RoadmapTopic[] }[];
};

export const ROLE_ROADMAPS: RoleRoadmap[] = [
  {
    key: "data-scientist",
    role: "Data Scientist",
    emoji: "🧠",
    tagline: "From Python fundamentals to production ML systems.",
    levels: [
      {
        level: "Beginner",
        weeks: "Weeks 1–6",
        topics: [
          { icon: "🐍", name: "Python", summary: "Core language for data manipulation, automation, and analytical models.", covers: ["Variables, data types, loops, conditionals", "Functions and modules", "OOP basics (class, object, inheritance)", "Libraries: math, datetime, os", "File handling (CSV, JSON)", "Basic scripting automation"], goal: "Write simple programs to load, clean, and manipulate data." },
          { icon: "🗄", name: "SQL", summary: "Talk to databases and extract structured data for analysis.", covers: ["SELECT, WHERE, ORDER BY", "JOINs (INNER, LEFT, RIGHT)", "GROUP BY, HAVING", "Aggregate functions (COUNT, AVG, SUM)", "Basic subqueries"], goal: "Extract and analyze data from relational databases independently." },
          { icon: "📊", name: "Statistics", summary: "Understand patterns, uncertainty, and behavior in data.", covers: ["Mean, median, mode", "Variance and standard deviation", "Probability basics", "Distributions (normal, binomial)", "Correlation vs causation"], goal: "Understand what data is telling you mathematically." },
          { icon: "🐼", name: "Pandas", summary: "The main tool for data manipulation and analysis in Python.", covers: ["DataFrames and Series", "Reading CSV / Excel files", "Filtering and sorting data", "Grouping and aggregation", "Handling missing values", "Merging datasets"], goal: "Clean and prepare real-world messy datasets." },
        ],
      },
      {
        level: "Intermediate",
        weeks: "Weeks 7–14",
        topics: [
          { icon: "🤖", name: "Machine Learning", summary: "Let systems learn patterns from data and make predictions.", covers: ["Supervised vs unsupervised learning", "Linear and logistic regression", "Decision trees and random forest", "KNN and clustering (K-Means)", "Train-test split"], goal: "Build basic predictive models from datasets." },
          { icon: "🧪", name: "Feature Engineering", summary: "Improve model accuracy by transforming raw data.", covers: ["Handling categorical variables", "One-hot encoding", "Feature scaling (standardization, normalization)", "Feature selection techniques", "Outlier detection"], goal: "Convert raw data into machine-learning-ready input." },
          { icon: "📈", name: "Model Evaluation", summary: "Ensure your model is accurate and reliable.", covers: ["Accuracy, precision, recall, F1", "Confusion matrix", "ROC-AUC curve", "Cross-validation", "Bias vs variance"], goal: "Measure and improve model performance properly." },
          { icon: "📊", name: "Data Visualization", summary: "Communicate insights clearly.", covers: ["Matplotlib and Seaborn", "Histograms and boxplots", "Scatter plots and pair plots", "Heatmaps", "Data storytelling"], goal: "Turn data into understandable insights." },
        ],
      },
      {
        level: "Advanced",
        weeks: "Weeks 15–24",
        topics: [
          { icon: "🧠", name: "Deep Learning", summary: "Handle complex patterns like images, speech, and text.", covers: ["Neural network basics", "Backpropagation", "CNN (images)", "RNN (sequences)", "Activation functions", "TensorFlow / PyTorch"], goal: "Build AI models that learn complex patterns." },
          { icon: "⚙️", name: "MLOps", summary: "Deploy and maintain ML models in real systems.", covers: ["Model deployment (Flask / FastAPI)", "Docker basics", "Model versioning", "CI/CD pipelines", "Monitoring models in production"], goal: "Take ML models from notebook to production system." },
          { icon: "🧾", name: "LLM / NLP", summary: "Work with language-based AI systems.", covers: ["Tokenization and embeddings", "Transformer architecture", "Fine-tuning models", "Prompt engineering", "RAG systems"], goal: "Build intelligent language-based AI applications." },
          { icon: "⚡", name: "Spark", summary: "Process massive datasets efficiently.", covers: ["Distributed computing basics", "Spark DataFrames", "RDDs", "Transformations and actions", "Big data pipelines"], goal: "Process massive datasets efficiently." },
        ],
      },
    ],
  },
  {
    key: "ai-engineer",
    role: "AI Engineer",
    emoji: "🤖",
    tagline: "Build, ship, and scale intelligent AI systems.",
    levels: [
      {
        level: "Beginner",
        weeks: "Weeks 1–6",
        topics: [
          { icon: "🐍", name: "Python (Advanced Usage)", summary: "Deeper than DS — focused on building AI systems.", covers: ["Advanced OOP", "Modules and packages", "API usage", "Exception handling", "Clean code structure"], goal: "Build structured AI applications, not just scripts." },
          { icon: "➗", name: "Math for AI", summary: "The mathematical foundation of AI systems.", covers: ["Linear algebra (vectors, matrices)", "Probability theory", "Gradients and derivatives", "Optimization basics"], goal: "Understand how AI models 'think' mathematically." },
          { icon: "🤖", name: "ML Basics", summary: "Core foundation of AI systems.", covers: ["Regression models", "Classification models", "Overfitting concepts", "Basic pipelines"], goal: "Understand machine learning workflow." },
          { icon: "🔧", name: "Git", summary: "Version control for team AI development.", covers: ["Commit, push, pull", "Branching and merging", "GitHub workflows"], goal: "Collaborate on AI projects efficiently." },
        ],
      },
      {
        level: "Intermediate",
        weeks: "Weeks 7–14",
        topics: [
          { icon: "🧠", name: "Deep Learning", summary: "Used for advanced AI like vision and NLP.", covers: ["Neural network architecture", "Loss functions", "Optimizers (Adam, SGD)", "Regularization"], goal: "Train deep learning models effectively." },
          { icon: "🔥", name: "Transformers", summary: "The modern architecture behind GPT-style models.", covers: ["Attention mechanism", "Encoder–decoder models", "BERT, GPT concepts", "Tokenization methods"], goal: "Understand modern LLM architecture." },
          { icon: "⚙️", name: "PyTorch / TensorFlow", summary: "Frameworks used to build AI models.", covers: ["Tensor operations", "Model building", "Training loops", "GPU acceleration"], goal: "Build and train deep learning models." },
          { icon: "🌐", name: "APIs", summary: "Expose AI models to users.", covers: ["REST APIs", "Flask / FastAPI", "JSON handling", "Request / response flow"], goal: "Make AI models usable in real applications." },
        ],
      },
      {
        level: "Advanced",
        weeks: "Weeks 15–24",
        topics: [
          { icon: "🤖", name: "LLM Systems", summary: "Build applications on top of large language models.", covers: ["Prompt engineering", "Function calling", "Model chaining", "System design for LLM apps"], goal: "Build ChatGPT-like systems." },
          { icon: "🔎", name: "RAG Pipelines", summary: "Combine search with AI generation.", covers: ["Embeddings", "Vector search", "Chunking strategies", "Retrieval systems"], goal: "Build knowledge-based AI systems." },
          { icon: "🤖", name: "AI Agents", summary: "Autonomous AI systems that perform tasks.", covers: ["Tool usage", "Memory systems", "Decision loops", "Multi-agent systems"], goal: "Build self-operating AI systems." },
          { icon: "🧠", name: "Vector Databases", summary: "Store AI embeddings for fast semantic search.", covers: ["FAISS, Pinecone, Weaviate", "Similarity search", "Indexing methods"], goal: "Enable fast semantic search for AI." },
        ],
      },
    ],
  },
  {
    key: "data-analyst",
    role: "Data Analyst",
    emoji: "📊",
    tagline: "Turn structured data into decisions leaders act on.",
    levels: [
      {
        level: "Beginner",
        weeks: "Weeks 1–5",
        topics: [
          { icon: "📗", name: "Excel / Sheets", summary: "The universal analyst toolkit.", covers: ["Formulas & references", "Pivot tables", "Lookups (VLOOKUP, XLOOKUP)", "Charts & conditional formatting"], goal: "Analyze and present data confidently in spreadsheets." },
          { icon: "🗄", name: "SQL", summary: "Query structured business data.", covers: ["SELECT, WHERE, ORDER BY", "JOINs", "GROUP BY, HAVING", "Window functions (intro)"], goal: "Answer business questions directly from the warehouse." },
          { icon: "📊", name: "Statistics", summary: "Reason about trends and uncertainty.", covers: ["Descriptive stats", "Distributions", "Hypothesis testing basics", "Correlation vs causation"], goal: "Draw valid conclusions from data." },
        ],
      },
      {
        level: "Intermediate",
        weeks: "Weeks 6–12",
        topics: [
          { icon: "📈", name: "BI Tools", summary: "Build interactive dashboards leaders use.", covers: ["Power BI or Tableau basics", "Data modeling", "DAX / calculated fields", "Publishing & sharing"], goal: "Ship polished dashboards for stakeholders." },
          { icon: "🐍", name: "Python for Analysts", summary: "Automate repetitive analysis.", covers: ["Pandas", "Matplotlib / Plotly", "Jupyter workflows", "Data cleaning"], goal: "Move beyond spreadsheets for larger data." },
          { icon: "🧪", name: "A/B Testing", summary: "Measure impact rigorously.", covers: ["Experiment design", "Sample size & power", "Statistical significance", "Reporting results"], goal: "Run and interpret controlled experiments." },
        ],
      },
      {
        level: "Advanced",
        weeks: "Weeks 13–20",
        topics: [
          { icon: "🏗", name: "Data Modeling", summary: "Design analytics-friendly schemas.", covers: ["Star / snowflake schemas", "Slowly changing dimensions", "dbt basics", "Metric layers"], goal: "Own reliable, reusable analytics models." },
          { icon: "🤖", name: "Predictive Analytics", summary: "Add forecasting to reporting.", covers: ["Regression models", "Time-series forecasting", "Customer segmentation", "Churn prediction"], goal: "Move from descriptive to predictive analytics." },
          { icon: "🧭", name: "Storytelling", summary: "Drive decisions with narratives.", covers: ["Executive summaries", "Visual best practices", "Presentation design", "Stakeholder management"], goal: "Turn dashboards into decisions." },
        ],
      },
    ],
  },
];

export const LEARNING = [
  { title: "Certified Kubernetes Application Developer", provider: "CNCF", weeks: 6, level: "Intermediate", relevance: 94 },
  { title: "Distributed Training with PyTorch", provider: "PyTorch", weeks: 4, level: "Advanced", relevance: 91 },
  { title: "MLOps Specialization", provider: "DeepLearning.AI", weeks: 12, level: "Intermediate", relevance: 88 },
  { title: "System Design for ML", provider: "Educative", weeks: 8, level: "Advanced", relevance: 85 },
];

export const INTERVIEW_QUESTIONS = {
  technical: [
    "Design a low-latency recommendation system for 100M users.",
    "Explain the trade-offs between DDP and FSDP for training a 70B model.",
    "How would you detect and mitigate concept drift in production?",
    "Walk through the math of attention. Where does the sqrt(d_k) come from?",
    "Design a feature store for real-time and batch features.",
  ],
  hr: [
    "Tell me about a time you disagreed with a technical decision.",
    "Where do you see your career in 3 years?",
    "Describe a project where you had to learn something entirely new.",
    "How do you handle ambiguous requirements from stakeholders?",
  ],
};

export const COACH_MESSAGES = [
  { role: "assistant", content: "Hey Ananya — I noticed your resume just crossed a 92 ATS. Want me to prep you for the Nimbus Labs interview next Tuesday?" },
  { role: "user", content: "Yes, focus on system design + MLOps." },
  { role: "assistant", content: "Perfect. I'll queue up 3 mock rounds: (1) feature store design, (2) distributed training tradeoffs, (3) model rollout strategy. Also — add a bullet quantifying your inference latency wins. Want me to draft it?" },
];

export const NOTIFICATIONS = [
  { id: 1, title: "New match: Staff ML Engineer @ Vercel", time: "2m ago", type: "match", unread: true },
  { id: 2, title: "Ananya applied to your ML Engineer role", time: "18m ago", type: "recruiter", unread: true },
  { id: 3, title: "Your resume analysis is ready", time: "1h ago", type: "system", unread: true },
  { id: 4, title: "Interview with Nimbus Labs confirmed for Tue", time: "yesterday", type: "interview", unread: false },
  { id: 5, title: "Weekly analytics report available", time: "2d ago", type: "system", unread: false },
];

export const PERFORMANCE_TREND = Array.from({ length: 30 }).map((_, i) => ({
  day: i + 1,
  applications: Math.round(20 + Math.sin(i / 3) * 8 + i * 0.4),
  interviews: Math.round(6 + Math.cos(i / 4) * 3 + i * 0.15),
  offers: Math.round(1 + Math.sin(i / 5) * 1.2 + i * 0.06),
}));
