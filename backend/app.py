from flask import Flask
import pymysql
from sqlalchemy import Column, String, DateTime, Integer, create_engine,ForeignKey,Boolean
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

class Member(Base):
    __tablename__ = 'members'
    name = Column(String(30), nullable=False)
    email = Column(String(80), primary_key=True, nullable=False, unique=True)
    password = Column(String(30), nullable=False)

    def __repr__(self):
        return f"<Member name={self.name} email={self.email}>"

class Student(Base):
    __tablename__ = 'students'
    id = Column(Integer())
    major = Column(String(100), nullable=False)
    graduation_time = Column(String(100),nullable=False)
    personalityTestResults = Column(String(100),nullable=False)

    def __repr__(self):
        return f"<Student id={self.id} major={self.major} graduation time={self.grade} " \
               f"Personality Test Results={self.personalityTestResults}>"


class Company(Base):
    __tablename__ = 'companies'
    id = Column(Integer())

    def __repr__(self):
        return f"<Company id={self.id}>"


class Admin(Base):
    __tablename__ = 'admins'
    id = Column(Integer(), primary_key=True)
    password = Column(String(100),nullable=False)

    def __repr__(self):
        return f"<Admin id={self.id}>"


class Apply(Base):
    __tablename__ = 'applications'
    id = Column(Integer(),primary_key=True)
    student_email = Column(String(100), nullable=False)
    post_id = Column(Integer(), nullable=False)
    isOnline = Column(Boolean())
    Datetime = Column(DateTime(),default=datetime.utcnow)

    def __repr__(self):
        return f"<Application id={self.id} student email={self.student_email} post id={self.post_id} " \
               f"isOnline={self.isOnline} Datetime={self.Datetime}>"


class Post(Base):
    __tablename__ = 'posts'
    publisher_email = Column(String(100), nullable=False, primary_key=True)
    Datetime = Column(DateTime(), default=datetime.utcnow)

    def __repr__(self):
        return f"<Post publisher email={self.publisher_email} Date={self.Datetime}>"

class GeneralPost(Base):
    __tablename__ = 'generalPosts'
    id = Column(Integer(), primary_key=True)
    content = Column(String(1000), nullable=False)

    def __repr__(self):
        return f"<General Post id={self.id} content ={self.content}>"


class JobPost(Base):
    __tablename__ = 'jobPosts'
    id = Column(Integer(),primary_key=True)
    job_description = Column(String(1000), nullable=False)
    job_requirements = Column(String(1000), nullable=False)
    start_date = Column(String(100),nullable=False)
    end_time = Column(String(100),nullable=False)

    def __repr__(self):
        return f"<Job Post id={self.id} description ={self.description} requirements={self.job_requirements} " \
               f"start date={self.start_date} end date={self.end_time}>"


class CV(Base):
    __tablename__ = 'cvs'
    id = Column(Integer(),primary_key=True)
    last_update_time = Column(DateTime(),default=datetime.utcnow)
    pdf_path = Column(String(500), nullable=False)

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


    def __repr__(self):
        return f"<Profile id={self.id} email ={self.email} name={self.name} " \
               f"CV id={self.CV_id} project experience={self.project_experience}" \
               f"internship experience={self.internship_experience} education background={self.education_background}" \
               f"awards={self.awards} activities={self.activities} skills={self.skills}>"

class Comment(Base):
    __tablename__ = 'comments'
    id = Column(Integer(),primary_key=True)
    content = Column(String(1000), nullable=False)
    Datetime = Column(DateTime(), default=datetime.utcnow)
    target_id = Column(Integer(), nullable=False)
    Is_father = Column(Boolean(),nullable=False)
    From = Column(Integer(),nullable=False)
    Likes = Column(String(1000),nullable=False)

    def __repr__(self):
        return f"<Comment id={self.id} content ={self.content} publish date={self.Datetime} " \
               f"target={self.target_id} From={self.From} Likes={self.Likes}>"






new_user=User(id=1,username="Jonathan",email="jona@jona.com")
print(new_user)

if __name__ == "__main__":
    print(1)
    app.run("127.0.0.1", 5000)

