from flask import Flask
import pymysql
from sqlalchemy import Column, String, DateTime, Integer, create_engine, ForeignKey, Boolean, UniqueConstraint
from datetime import datetime
import os
from sqlalchemy.orm import sessionmaker,declarative_base,relationship,scoped_session


DB_NAME = 'internshare'
connect_string = 'mysql+pymysql://{}:{}@{}:{}/{}?charset=utf8mb4'.format('admin', 'Alibaba123..', 'internshare.ctoh8sqi2mdr.ap-southeast-1.rds.amazonaws.com', 3306, 'internshare')
engine = create_engine(connect_string, convert_unicode=True, echo=True)
session = scoped_session(
    sessionmaker(
        bind=engine,
        autocommit=False,
        autoflush=False
    )
)
session.configure(bind=engine)
Base = declarative_base()

app = Flask(__name__, static_url_path='')

@app.errorhandler(404)
def index(error):
    return app.send_static_file('index.html')

class Student(Base):
    __tablename__ = 'students'
    id = Column(Integer())
    name = Column(String(30), nullable=False)
    email = Column(String(80), primary_key=True, nullable=False, unique=True)
    password = Column(String(30), nullable=False)
    major = Column(String(100), nullable=False)
    graduation_time = Column(String(100),nullable=False)
    personalityTestResults = Column(String(100),nullable=False)

    pro_relationship = relationship('Profile',back_populates='stu_relationship')
    memberships = relationship("Apply", back_populates='student_rela')
    jobpost_relationship = relationship("JobPost")
    generalpost_relationship = relationship("GeneralPost")
    comment_relationship = relationship("Comment",back_populates='student_comment')
    
    def __repr__(self):
        return f"<Student id={self.id} name={self.name} email={self.email} major={self.major} graduation time={self.grade} " \
               f"Personality Test Results={self.personalityTestResults}>"


class Company(Base):
    __tablename__ = 'companies'
    id = Column(Integer())
    name = Column(String(30), nullable=False)
    email = Column(String(80), primary_key=True, nullable=False, unique=True)
    password = Column(String(30), nullable=False)

    jobpost_relationship = relationship("JobPost")
    generalpost_relationship = relationship("GeneralPost")
    comment_relationship = relationship("Comment",back_populates='company_comment')


    def __repr__(self):
        return f"<Company id={self.id} name={self.name} email={self.email}>"


class Admin(Base):
    __tablename__ = 'admins'
    id = Column(Integer(), primary_key=True)
    password = Column(String(100),nullable=False)

    def __repr__(self):
        return f"<Admin id={self.id}>"


class Application(Base):
    __tablename__ = 'applications'
    id = Column(Integer(),primary_key=True)
    student_email = Column(String(100), nullable=False)
    post_id = Column(Integer(), nullable=False)
    isOnline = Column(Boolean())
    Datetime = Column(DateTime(),default=datetime.utcnow)

    memberships = relationship("Apply", back_populates='appli_rela')

    def __repr__(self):
        return f"<Application id={self.id} student email={self.student_email} post id={self.post_id} " \
               f"isOnline={self.isOnline} Datetime={self.Datetime}>"

class GeneralPost(Base):
    __tablename__ = 'generalPosts'
    id = Column(Integer(), primary_key=True)
    is_Company = Column(Boolean())
    if is_Company:
        publisher_email = Column(String(100), ForeignKey("companies.id"))
    else:
        publisher_email = Column(String(100), ForeignKey("students.id"))
    content = Column(String(1000), nullable=False)
    publisher_email = Column(String(100), nullable=False, primary_key=True)
    Datetime = Column(DateTime(), default=datetime.utcnow)

    def __repr__(self):
        return f"<General Post id={self.id} publisher email={self.publisher_email} Date={self.Datetime} content ={self.content}>"


class JobPost(Base):
    __tablename__ = 'jobPosts'
    id = Column(Integer(),primary_key=True)
    is_Company = Column(Boolean())
    if is_Company:
        publisher_email = Column(String(100), ForeignKey("companies.id"))
    else:
        publisher_email = Column(String(100), ForeignKey("students.id"))
    Datetime = Column(DateTime(), default=datetime.utcnow)
    job_description = Column(String(1000), nullable=False)
    job_requirements = Column(String(1000), nullable=False)
    start_date = Column(String(100),nullable=False)
    end_time = Column(String(100),nullable=False)

    memberships = relationship("Apply", back_populates='jobpost_rela')

    def __repr__(self):
        return f"<Job Post id={self.id} publisher email={self.publisher_email} Date={self.Datetime} description ={self.description} requirements={self.job_requirements} " \
               f"start date={self.start_date} end date={self.end_time}>"

class CV(Base):
    __tablename__ = 'cvs'
    id = Column(Integer(),primary_key=True)
    last_update_time = Column(DateTime(),default=datetime.utcnow)
    pdf_path = Column(String(5000), nullable=False)

    def __repr__(self):
        return f"<CV id={self.id} last update time={self.last_update_time} pdf path={self.pdf_path}>"

class Profile(Base):
    __tablename__ = 'profiles'
    id = Column(Integer(),primary_key=True)
    email = Column(String(100), nullable=False)
    name = Column(String(100), nullable=False)
    CV_id = Column(Integer(),nullable=False)
    project_experience = Column(String(5000), nullable=False)
    internship_experience = Column(String(5000), nullable=False)
    education_background = Column(String(5000), nullable=False)
    awards = Column(String(5000), nullable=False)
    activities = Column(String(5000), nullable=False)
    skills = Column(String(5000), nullable=False)
    student_id = Column(Integer(), ForeignKey('students.id'))

    stu_relationship = relationship("Student", back_populates='pro_relationship')


    def __repr__(self):
        return f"<Profile id={self.id} email ={self.email} name={self.name} " \
               f"CV id={self.CV_id} project experience={self.project_experience}" \
               f"internship experience={self.internship_experience} education background={self.education_background}" \
               f"awards={self.awards} activities={self.activities} skills={self.skills}>"

class Comment(Base):
    __tablename__ = 'comments'
    id = Column(Integer(),primary_key=True)
    is_Company = Column(Boolean())
    if is_Company:
        publisher_email = Column(String(100), ForeignKey("companies.id"))
    else:
        publisher_email = Column(String(100), ForeignKey("students.id"))
    content = Column(String(1000), nullable=False)
    Datetime = Column(DateTime(), default=datetime.utcnow)
    target_id = Column(Integer(), nullable=False)
    Is_father = Column(Boolean(),nullable=False)
    From = Column(Integer(),nullable=False)
    Likes = Column(String(1000),nullable=False)

    student_comment = relationship("Student",back_populates='comment_relationship')
    company_comment = relationship("Company",back_populates='comment_relationship')

    def __repr__(self):
        return f"<Comment id={self.id} content ={self.content} publish date={self.Datetime} " \
               f"target={self.target_id} From={self.From} Likes={self.Likes}>"


class Apply(Base):
    __tablename__='applies'
    student_id = Column(Integer(), ForeignKey('students.id'), primary_key=True)
    application_id = Column(Integer(), ForeignKey('applications.id'), primary_key=True)
    jobpost_id = Column(Integer(), ForeignKey('jobPosts.id'), primary_key=True)

    UniqueConstraint('student_id', 'application_id', 'jobpost_id')
    student_rela = relationship('Student', uselist=False, backref='memberships', lazy='dynamic')
    appli_rela = relationship('Application', uselist=False, backref='memberships', lazy='dynamic')
    jobpost_rela = relationship('JobPost', uselist=False, backref='memberships', lazy='dynamic')

    def __init__(self, student, application, jobpost):
        self.user_id = student
        self.team_id = application
        self.role_id = jobpost

    def __repr__(self):
        return "<Membership(%s)>"


if __name__ == "__main__":
    print(1)
    app.run("127.0.0.1", 5000)

