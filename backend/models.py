from sqlalchemy import Column, Integer, String, Boolean
from database import Base


class User(Base):

    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String, nullable=False)
    dob = Column(String)
    gender = Column(String)

    country = Column(String)
    state = Column(String)
    city = Column(String)

    role = Column(String)

    email = Column(String, unique=True, index=True)

    github = Column(String, nullable=True)

    linkedin = Column(String, nullable=True)

    profile_image = Column(String, nullable=True)

    
    phone = Column(String)
    password = Column(String)

    verified = Column(Boolean, default=False)


from sqlalchemy import Float, ForeignKey, Text
from sqlalchemy.orm import relationship
from sqlalchemy import DateTime
from datetime import datetime

class Resume(Base):
    __tablename__ = "resumes"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, ForeignKey("users.id"))

    resume_score = Column(Float)

    ats_score = Column(Float)

    career_level = Column(String)

    detected_role = Column(String)

    skills = Column(Text)

    roadmap = Column(Text)

    ai_suggestions = Column(Text)

   # created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User")



class Education(Base):
    __tablename__ = "education"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, ForeignKey("users.id"))

    degree = Column(String)

    college = Column(String)

    start_year = Column(String)

    end_year = Column(String)

class Experience(Base):
    __tablename__ = "experience"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, ForeignKey("users.id"))

    company = Column(String)

    role = Column(String)

    start_date = Column(String)

    end_date = Column(String)

    description = Column(String)


class Certification(Base):
    __tablename__ = "certification"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, ForeignKey("users.id"))

    certificate_name = Column(String)

    organization = Column(String)

    year = Column(String)



class Notification(Base):
    __tablename__ = "notifications"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, ForeignKey("users.id"))

    title = Column(String)

    message = Column(String)

    type = Column(String)

    read = Column(Boolean, default=False)

    created_at = Column(DateTime, default=datetime.utcnow)


class InterviewSession(Base):
    __tablename__ = "interview_sessions"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, ForeignKey("users.id"))

    role = Column(String)

    company = Column(String)

    difficulty = Column(String)

    total_score = Column(Float, default=0)

    created_at = Column(DateTime, default=datetime.utcnow)


class InterviewAnswer(Base):
    __tablename__ = "interview_answers"

    id = Column(Integer, primary_key=True, index=True)

    session_id = Column(Integer, ForeignKey("interview_sessions.id"))

    question = Column(Text)

    answer = Column(Text)

    feedback = Column(Text)

    score = Column(Float)

    created_at = Column(DateTime, default=datetime.utcnow)