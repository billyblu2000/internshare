import pymysql
from mysqlx import Table
from sqlalchemy import Column, String, DateTime, Integer, create_engine, ForeignKey, Boolean, delete, PickleType, \
    LargeBinary
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
    name = Column(String(100), nullable=False)
    email = Column(String(80), nullable=False, primary_key=True)
    password = Column(String(100), nullable=False)
    major = Column(String(100), nullable=False)
    graduation_time = Column(String(100), nullable=False)
    personalityTestResults = Column(String(100), nullable=True)
    profile_id = Column(Integer(), ForeignKey("profiles.id"))
    color = Column(String(100),nullable=False)

    pro_relationship = relationship('Profile', back_populates='stu_relationship',passive_deletes=True)
    memberships_a = relationship("Application", back_populates='student_rela',passive_deletes=True)
    jobpost_relationship = relationship("JobPost",passive_deletes=True)
    generalpost_relationship = relationship("GeneralPost",passive_deletes=True)
    comment_relationship = relationship("Comment", back_populates='student_comment',passive_deletes=True)

    def __repr__(self):
        return f"<Student id={self.id} name={self.name} email={self.email} major={self.major} graduation time={self.graduation_time} " \
               f"Personality Test Results={self.personalityTestResults} color={self.color}>"


class Company(Base):
    __tablename__ = 'companies'
    id = Column(Integer(), primary_key=True,index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(80), nullable=False, unique=True)
    password = Column(String(100), nullable=False)
    color = Column(String(100), nullable=False)

    jobpost_relationship = relationship("JobPost")
    generalpost_relationship = relationship("GeneralPost")
    comment_relationship = relationship("Comment", back_populates='company_comment',passive_deletes=True)

    def __repr__(self):
        return f"<Company id={self.id} name={self.name} email={self.email} color={self.color}>"


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
    status = Column(String(100),default = "Pending")

    student_rela = relationship('Student', back_populates='memberships_a',passive_deletes=True)
    jobpost_rela = relationship('JobPost', back_populates='memberships_c',passive_deletes=True)

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
    Datetime = Column(DateTime(), default=datetime.utcnow)
    post_title = Column(String(100),nullable=False)

    comment_relationship = relationship("Comment", back_populates='generalpost_comment',passive_deletes=True)

    def __repr__(self):
        return f"<General Post id={self.id} post title={self.post_title} Date={self.Datetime} content ={self.content}>"

class PostHashtag(Base):
    __tablename__ = 'postHashtags'

    id = Column(Integer, primary_key=True, index=True)
    hashtag = Column(String(100),ForeignKey('hashtags.hashtag',ondelete='CASCADE',onupdate='CASCADE'))
    jobpost_id = Column(Integer, ForeignKey('jobPosts.id',ondelete='CASCADE',onupdate='CASCADE'))

class JobPost(Base):
    __tablename__ = 'jobPosts'
    id = Column(Integer(), primary_key=True,index=True)
    is_Company = Column(Boolean())
    company_email = Column(String(100), ForeignKey("companies.email"))
    student_email = Column(String(100), ForeignKey("students.email"))
    Datetime = Column(DateTime(), default=datetime.utcnow)
    job_description = Column(String(1000), nullable=False)
    job_requirements = Column(String(1000), nullable=False)
    job_start_date = Column(DateTime())
    job_end_time = Column(DateTime())
    apply_start_date = Column(DateTime())
    apply_end_date = Column(DateTime(),nullable=False)
    company_name = Column(String(100),nullable=False)
    post_title = Column(String(100),nullable=False)
    estimate_salary = Column(Integer())

    memberships_c = relationship("Application", back_populates='jobpost_rela',passive_deletes=True)
    comment_relationship = relationship("Comment", back_populates='jobpost_comment',passive_deletes=True)
    jobpost_hashtag = relationship("Hashtag", secondary=PostHashtag.__table__, backref='JobPost',passive_deletes=True)

    def __repr__(self):
        return f"<Job Post id={self.id} company name={self.company_name} is company={self.is_Company} " \
               f"company_email ={self.company_email}" \
               f" post title={self.post_title} student_email = {self.student_email} " \
               f"Date={self.Datetime} description ={self.job_description} requirements={self.job_requirements} " \
               f"job start date={self.job_start_date} job end date={self.job_end_time} " \
               f"apply start date={self.apply_start_date}>" \
               f"apply end date={self.apply_end_date} estimate salary ={self.estimate_salary}"


class Hashtag(Base):
    __tablename__ = 'hashtags'
    hashtag = Column(String(500), primary_key=True)

    hashtag_relationship = relationship("JobPost", secondary=PostHashtag.__table__, backref='Hashtag',passive_deletes=True)



class CV(Base):
    __tablename__ = 'cvs'
    id = Column(Integer(), primary_key=True,index=True)
    last_update_time = Column(DateTime(), default=datetime.utcnow)
    pdf_path = Column(String(5000), nullable=False)
    data = Column(LargeBinary(),nullable=False)

    def __repr__(self):
        return f"<CV id={self.id} last update time={self.last_update_time} pdf path={self.pdf_path} data={self.data}>"


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
    public = Column(Boolean(), nullable=False)

    stu_relationship = relationship("Student", back_populates='pro_relationship',passive_deletes=True)

    def __repr__(self):
        return f"<Profile id={self.id} email ={self.email} name={self.name} " \
               f"CV id={self.CV_id} project experience={self.project_experience}" \
               f"internship experience={self.internship_experience} education background={self.education_background}" \
               f"awards={self.awards} activities={self.activities} skills={self.skills} public={self.public}>"


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
    Likes = Column(Integer())

    student_comment = relationship("Student", back_populates='comment_relationship',passive_deletes=True)
    company_comment = relationship("Company", back_populates='comment_relationship',passive_deletes=True)
    jobpost_comment = relationship("JobPost", back_populates='comment_relationship',passive_deletes=True)
    generalpost_comment = relationship("GeneralPost", back_populates='comment_relationship',passive_deletes=True)
    comment_comment = relationship("Comment", remote_side=[id],passive_deletes=True)

    def __repr__(self):
        return f"<Comment id={self.id} content ={self.content} publish date={self.Datetime} \
                Likes={self.Likes} comment_id = {self.comment_id}>"



local_session = sessions()


