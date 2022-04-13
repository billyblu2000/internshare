import pymysql
from mysqlx import Table
from sqlalchemy import Column, String, DateTime, Integer, create_engine, ForeignKey, Boolean, delete
from datetime import datetime
import os
import sqlalchemy
from sqlalchemy.orm import sessionmaker,declarative_base,relationship,scoped_session

DB_NAME = 'internshare'
connect_string = 'mysql+pymysql://{}:{}@{}:{}/{}?charset=utf8mb4'.format('admin', 'Alibaba123..', 'internshare.ctoh8sqi2mdr.ap-southeast-1.rds.amazonaws.com', 3306, 'internshare')
engine = create_engine(connect_string, convert_unicode=True, echo=True)
sessions = scoped_session(
    sessionmaker(
        bind=engine,
        autocommit=False,
        autoflush=False
    )
)
sessions.configure(bind=engine)
Base = declarative_base()

class Student(Base):
    __tablename__ = 'students'
    id = Column(Integer(),index=True)
    name = Column(String(30), nullable=False)
    email = Column(String(80), nullable=False, primary_key=True)
    password = Column(String(30), nullable=False)
    major = Column(String(100), nullable=False)
    graduation_time = Column(String(100), nullable=False)
    personalityTestResults = Column(String(100), nullable=True)
    profile_id = Column(Integer(), ForeignKey("profiles.id"))
    color = Column(String(100),nullable=False)

    pro_relationship = relationship('Profile', back_populates='stu_relationship')
    memberships_a = relationship("Application", back_populates='student_rela')
    jobpost_relationship = relationship("JobPost")
    generalpost_relationship = relationship("GeneralPost")
    comment_relationship = relationship("Comment", back_populates='student_comment')

    def __repr__(self):
        return f"<Student id={self.id} name={self.name} email={self.email} major={self.major} graduation time={self.graduation_time} " \
               f"Personality Test Results={self.personalityTestResults} color={self.color}>"


class Company(Base):
    __tablename__ = 'companies'
    id = Column(Integer(), primary_key=True,index=True)
    name = Column(String(30), nullable=False)
    email = Column(String(80), nullable=False, unique=True)
    password = Column(String(30), nullable=False)

    jobpost_relationship = relationship("JobPost")
    generalpost_relationship = relationship("GeneralPost")
    comment_relationship = relationship("Comment", back_populates='company_comment')

    def __repr__(self):
        return f"<Company id={self.id} name={self.name} email={self.email}>"


class Admin(Base):
    __tablename__ = 'admins'
    id = Column(Integer(), primary_key=True,index=True)
    password = Column(String(100), nullable=False)

    def __repr__(self):
        return f"<Admin id={self.id}>"


class Application(Base):
    __tablename__ = 'applications'
    id = Column(Integer(), primary_key=True,index=True)
    student_email = Column(String(100), ForeignKey('students.id'))
    post_id = Column(Integer(), ForeignKey('jobPosts.id'))
    isOnline = Column(Boolean())
    Datetime = Column(DateTime(), default=datetime.utcnow)
    status = Column(String(100))

    student_rela = relationship('Student', back_populates='memberships_a')
    jobpost_rela = relationship('JobPost', back_populates='memberships_c')

    def __repr__(self):
        return f"<Application id={self.id} student email={self.student_email} post id={self.post_id} " \
               f"isOnline={self.isOnline} Datetime={self.Datetime} Status={self.status}>"


class GeneralPost(Base):
    __tablename__ = 'generalPosts'
    id = Column(Integer(), primary_key=True,index=True)
    is_Company = Column(Boolean())
    company_email = Column(String(100), ForeignKey("companies.email"))
    student_email = Column(String(100), ForeignKey("students.email"))
    content = Column(String(1000), nullable=False)
    publisher_email = Column(String(100), nullable=False)
    Datetime = Column(DateTime(), default=datetime.utcnow)
    post_title = Column(String(100),nullable=False)

    comment_relationship = relationship("Comment", back_populates='generalpost_comment')

    def __repr__(self):
        return f"<General Post id={self.id} post title={self.post_title} publisher email={self.publisher_email} Date={self.Datetime} content ={self.content}>"

class PostHashtag(Base):
    __tablename__ = 'postHashtags'
    id = Column(Integer, primary_key=True, index=True)
    hashtag = Column(String(100),ForeignKey('hashtags.hashtag'))
    jobpost_id = Column(Integer, ForeignKey('jobPosts.id'))

class JobPost(Base):
    __tablename__ = 'jobPosts'
    id = Column(Integer(), primary_key=True,index=True)
    is_Company = Column(Boolean())
    company_email = Column(String(100), ForeignKey("companies.email"))
    student_email = Column(String(100), ForeignKey("students.email"))
    Datetime = Column(DateTime(), default=datetime.utcnow)
    job_description = Column(String(1000), nullable=False)
    job_requirements = Column(String(1000), nullable=False)
    start_date = Column(DateTime())
    end_time = Column(DateTime())
    company_name = Column(String(100),nullable=False)
    post_title = Column(String(100),nullable=False)

    memberships_c = relationship("Application", back_populates='jobpost_rela')
    comment_relationship = relationship("Comment", back_populates='jobpost_comment')
    jobpost_hashtag = relationship("Hashtag", secondary=PostHashtag.__table__, backref='JobPost')

    def __repr__(self):
        return f"<Job Post id={self.id} company name={self.company_name} post title={self.post_title} publisher email={self.publisher_email} Date={self.Datetime} description ={self.description} requirements={self.job_requirements} " \
               f"start date={self.start_date} end date={self.end_time}>"


class Hashtag(Base):
    __tablename__ = 'hashtags'
    hashtag = Column(String(500), primary_key=True)

    hashtag_relationship = relationship("JobPost", secondary=PostHashtag.__table__, backref='Hashtag')



class CV(Base):
    __tablename__ = 'cvs'
    id = Column(Integer(), primary_key=True,index=True)
    last_update_time = Column(DateTime(), default=datetime.utcnow)
    pdf_path = Column(String(5000), nullable=False)

    def __repr__(self):
        return f"<CV id={self.id} last update time={self.last_update_time} pdf path={self.pdf_path}>"


class Profile(Base):
    __tablename__ = 'profiles'
    id = Column(Integer(), primary_key=True,index=True)
    email = Column(String(100), nullable=False)
    name = Column(String(100), nullable=False)
    CV_id = Column(Integer(), nullable=False)
    project_experience = Column(String(500), nullable=False)
    internship_experience = Column(String(500), nullable=False)
    education_background = Column(String(500), nullable=False)
    awards = Column(String(500), nullable=False)
    activities = Column(String(500), nullable=False)
    skills = Column(String(500), nullable=False)

    stu_relationship = relationship("Student", back_populates='pro_relationship')

    def __repr__(self):
        return f"<Profile id={self.id} email ={self.email} name={self.name} " \
               f"CV id={self.CV_id} project experience={self.project_experience}" \
               f"internship experience={self.internship_experience} education background={self.education_background}" \
               f"awards={self.awards} activities={self.activities} skills={self.skills}>"


class Comment(Base):
    __tablename__ = 'comments'
    id = Column(Integer(), primary_key=True,index=True)
    company_email = Column(String(100), ForeignKey("companies.email"))
    student_email = Column(String(100), ForeignKey("students.email"))
    jpost_id = Column(Integer(), ForeignKey("jobPosts.id"))
    gpost_id = Column(Integer(), ForeignKey("generalPosts.id"))
    comment_id = Column(Integer(), ForeignKey("comments.id"))
    content = Column(String(500), nullable=False)
    Datetime = Column(DateTime(), default=datetime.utcnow)
    target_id = Column(Integer(), nullable=False)
    From = Column(Integer(), nullable=False)
    Likes = Column(Integer(), nullable=False)

    student_comment = relationship("Student", back_populates='comment_relationship')
    company_comment = relationship("Company", back_populates='comment_relationship')
    jobpost_comment = relationship("JobPost", back_populates='comment_relationship')
    generalpost_comment = relationship("GeneralPost", back_populates='comment_relationship')
    comment_comment = relationship("Comment", remote_side=[id])

    def __repr__(self):
        return f"<Comment id={self.id} content ={self.content} publish date={self.Datetime} " \
               f"target={self.target_id} From={self.From} Likes={self.Likes}>"

