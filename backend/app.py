from flask import Flask, render_template, request, session, url_for, redirect
import pymysql
from flask_mail import Mail, Message
import OTP
import json, random
import redis
import os
import datetime
import logging
from werkzeug.security import generate_password_hash, check_password_hash
import color_generator


from database.dataclass import *

local_session = sessions()
codeDict = {}

app = Flask(__name__, static_url_path='')
# session config
app.config["SESSION_PERMANENT"] = False
app.secret_key = "any random string"


mail = Mail(app)
# mail config
app.config['MAIL_SERVER']='smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = os.getenv("NAME")
app.config['MAIL_PASSWORD'] = os.getenv("PASSWORD")

app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True
mail = Mail(app)

# stop logging path
# log = logging.getLogger('werkzeug')
# log.disabled = True

#/backend

with open(os.getcwd()+'/backend/positions.json', 'r') as f:
  global_position = json.load(f)


# r = redis.Redis(host='localhost', port=6379, db=0)

# for session
# session["email"] = "yl7002@nyu.edu"
# session["type"] = "student"
# session["color"] = "ffffff"
# session["name"] = 'Yumeng Lu'
# session["major"] = "computer science"


# login page
@app.route('/api/login',methods = ['GET','POST'])
def login():
    # when login, need to specify them as company or student?
    content = request.get_json()
    pw = content['password']
    email=content['email']
    if "@nyu.edu" in email:
        user = local_session.query(Student).filter(Student.email == email).first()
        # if it is a student, not none
        if user:
            if check_password_hash(user.password, pw):
                session["role"]="student"
                session["name"] = user.name
                session["color"] = user.color
                session["email"] = email
                session["major"] = user.major
                return json.dumps({"status":"success"})
            else:
                return json.dumps({"status": "password does not match"})
    # turn to company database
    user = local_session.query(Company).filter(Company.email == email).first()
    if user:
        if check_password_hash(user.password,pw):
            session["role"] = "company"
            session["name"] = user.name
            return json.dumps({"status": "success"})
        else:
            return json.dumps({"status": "password does not match"})
    else:
        return json.dumps({"status":"user DNE"})


# register
@app.route('/api/register/student/sendemail',methods = ['GET','POST'])
def send_verification_email():
    code = OTP.generateOTP() # preserve in database??
    try:
        content = request.get_json()
        username = content["email"]
    except:
        return json.dumps({"status": "no email"})
    # set the expiration time to be 15 minutes
    # r.set(username,code,60*15)
    codeDict[username] = code
    msg = Message(subject = 'Thank you for registering for NYUSH Internshare platform!', sender='yl7002@nyu.edu', \
                  recipients=[username])
    msg.html = render_template("email_template.html",name= username,code=code)
    mail.send(msg)
    return json.dumps({"status":"success"})

# verify
# student
@app.route('/api/register/student/verify',methods = ['GET','POST'])
def verify_code():
    email = request.args["email"]
    code = request.args["code"]
    std = local_session.query(Student).filter(Student.email == email).first()
    if std:
        return json.dumps({"status":"user already exists!"})
    opt = codeDict[email]
    # code = r.get(username)
    if opt == code:
        return json.dumps({"status":"success"})
    elif code == "expire":
        return json.dumps({"status": "code does not match"})
    else:
        return json.dumps({"status": "code does not match"})

@app.route('/api/register/student',methods = ['GET','POST'])
def student_register():
    content = request.get_json()
    name = content["name"]
    email = content["email"]
    pw = content["password"]
    pw2 = content["confirPW"]
    if pw != pw2:
        return json.dumps({"status":"password does not match"})
    std = local_session.query(Student).filter(Student.email == email).first()
    if std:
        return json.dumps({"status":"user already exists"})
    major = content["major"]
    year = content["year"]
    hashpw = generate_password_hash(pw)
    hashcolor = color_generator.generate_background_color()
    new_student = Student(name= name, email= email, password= hashpw, major=major,
                          graduation_time=year,personalityTestResults="", color=hashcolor)
    local_session.add(new_student)
    local_session.commit()
    return json.dumps({"status":"success"})

# company
# register
@app.route('/api/register/company',methods = ['GET','POST'])
def company_register():
    email = request.get_json("email")

    pw = request.get_json("password")
    pw2 = request.get_json("confirm_pw")
    verification = request.get_json("verification")
    if pw != pw2:
        return json.dumps({"status":"password does not match"})
    cmpy = local_session.query(Student).filter(Student.email == email).first()

    if cmpy:
        cursor.close()
        return json.dumps({"status":"user already exists"})
    insertion = 'INSERT INTO user VALUES(%s, %s, %s, %s)'
    cursor.execute(insertion,(email,pw))
    cursor.close()
    return json.dumps({"status":"success"})

@app.route('/api/register/company/verify',methods = ['GET','POST'])
def company_verify():
    # need api?
    return json.dumps({"status":"success"})

@app.route("/api/recommendpost/jobs")
def recommendPostjobs():
    # get the major from the databases;
    # get graduation time from the databases;
    # get the desired post from the databases
    # based on job requirements and graduation time
    res = {}
    if "major" in session:
        major = session["major"]
    # search for five jobPosts and five General Posts
    # how to retreive the data
    # get the job post id
    result = local_session.query(PostHashtag).filter(PostHashtag.hashtag == major).all()
    list_id = []
    for i in range(len(result)):
        list_id.append(result[i].jobpost_id)

    # cur job post
    for id in list_id:
        job = local_session.query(JobPost).filter(JobPost.id == id).first()
        res[job.id] = {
            "title": job.post_title,
            "date": job.Datetime,
            "description": job.job_description,
            "company": job.company_name,
            "student_email": job.student_email,
            "requirement": job.job_requirements,
        }
    return json.dumps(res)

@app.route("/api/recommendpost/generals")
def recommendPostGenerals():
    res = {}
    generalposts = local_session.query(GeneralPost).order_by(GeneralPost.Datetime.desc()).limit(5).all()
    content_list = []
    for i in range(min(5,len(generalposts))):
        general =generalposts[i]
        res[general.id] = {
            "studennt_email": general.student_email,
            "company": general.company_email,
            "content": general.content,
            "title": general.post_title,
            "date": general.Datetime
        }
    return json.dumps(res)

@app.route("/api/applystatus")
def check_status():
    # returns a list of apply status, each status corresponding to an apply
    # of this user, the status should contain the position name and
    # the company name (if any), and the current status.
    email = session["email"]
    result = local_session.query(Application).filter(Application.student_email == email).all()
    res = {}
    # retrieve all info abt the job
    for i in range(len(result)):
        cur = result[i]
        post_id = cur.post_id
        status = cur.status
        print('\n\n\n\n', status,post_id, '\n\n\n\n\n')
        job_info = local_session.query(JobPost).filter(JobPost.id == post_id).first()
        res[post_id] = {
            "status": status,
            "title":job_info.post_title,
            "company_name":job_info.company_name,
            "start":job_info.start_date,
            "end":job_info.end_time
            }
    return json.dumps(res)

@app.route("/api/homepage/searchsuggestions",methods = ['GET'])
def hp_search_suggestion():
    content = request.args["content"]
    # search in the hashtag??
    suggestions = []
    for i in global_position:
        if content.lower() in i.lower():
            suggestions.append(i)
    random.shuffle(suggestions)
    suggestions= suggestions[:10]
    print(suggestions)
    # extract words from the company and job title
    return json.dumps(suggestions)

@app.route("/api/homepage/searchone/jobpost",methods = ['GET','POST'])
def search_particular_post_job():
    filter = request.args["filter"]
    res = {}
    # search inside the content to get results
    post = local_session.query(JobPost).all()
    content_list = []
    for i in post:
        content_list.append(post[i].job_description)
    # same with the general post
    post = local_session.query(GeneralPost).all()
    content_list = []
    page_num = request.args["pagenumber"]
    for i in post:
        content_list.append(post[i].content)
    # for job in jobs:
    #     res["job"][job.id] = {
    #         "title": job.title,
    #         "date": job.Datetime,
    #         "description": job.job_description,
    #         "company": job.company_name,
    #         "student_email": job.student_email,
    #         "requirement": job.jon_requirements,
    #     }
    return res

@app.route("/api/homepage/searchone/general",methods = ['GET','POST'])
def search_particular_post_general():
    filter = request.args["filter"]
    page_num = request.args["pagenumber"]
    res = {}
    # search inside the content to get results
    # generals = local_session.query()

    # for general in generals:
    #     res["general"][general.id] = {
    #         "studennt_email": general.student_email,
    #         "company": general.company_email,
    #         "content": general.content,
    #         "title": general.title,
    #         "date": general.Datetime
    #     }
    return res


@app.route("/api/getpostcomment",methods = ['GET','POST'])
def comment():
    content = request.get_json()
    id = content["jobpostid"]
    result = local_session.query(Comment, Student.name, Student.color).filter(Comment.jpost_id == id).filter(
        Comment.student_email == Student.email).all()
    try:
        result = local_session.query(Comment, Student.name, Student.color).filter(Comment.jpost_id == id).filter(
        Comment.student_email == Student.email).all()
        res = {}
        res["status"] = "ok"
        res["comment"] = []
        for i in range(len(result)):
            comment = result[i]
            # check if it is first layer
            if comment.comment_id == id:
                res.comment.append({
                    "id": comment[0].id,
                    "content": comment[0].content,
                    "datetime": comment[0].Datetime,
                    "userId": comment[0].Datetime,
                    "avatar": comment.color,
                    "name": comment.name,
                    "descendent":[]
                })
            # if it is the second layer
            else:
                target = comment.comment_id
                for each in res.comment:
                    if each["id"] == target:
                        each["descendent"].append({
                            "id": comment[0].id,
                            "content": comment[0].content,
                            "datetime": comment[0].Datetime,
                            "userId": comment[0].Datetime,
                            "avatar": comment.color,
                            "name": comment.name,
                        })
                    else:
                        continue
        return json.dumps(res)
    except:
        return json.dumps(
            {
              "status":"post id DNE",
              "comments":[]
            })


@app.route("/api/create/comment/job",methods=["GET","POST"])
def creat_comment():
    content = request.get_json()
    comment_content = content["content"]
    id = content["id"]
    email = content["email"]
    target = content["target_id"]
    try:
        new_data = Comment(content=comment_content,jpost_id=id, comment_id = target,student_email=email)
        local_session.add(new_data)
        local_session.commit()
        return json.dumps({"status":"ok"})
    except:
        return json.dumps({"status":"fail"})

@app.route("/api/change/status",methods=["GET","POST"])
def change_appication_status():
    content = request.get_json()
    student_email = content["email"]
    job_id = content["job_id"]
    status = content["status"]
    try:
        user = local_session.query(Application).filter(Application.id == 1).first()
        user.status = status
        local_session.commit()
        return json.dumps({"status": "ok"})
    except:
        return json.dumps({"status": "fail"})

@app.route("/api/view/applicants",methods=["GET","POST"])
def view_applicants():
    content = request.get_json()
    try:
        res = {}
        res["status"]="ok"
        res["applicants"]=[]
        job_id = content["job_id"]
        result = []
        for i in range(len(result)):
            applicant = result[i]
            res["applicants"].append({

            })
        return json.dumps(res)
    except:
        return json.dumps({"status": "fail"})

@app.route('/api/delete/jobpost',methods=["GET","POST"])
def delete_job_post():
    try:
        content = request.get_json()
        job_id = content["job_id"]
        user_to_delete = local_session.query(JobPost).filter(JobPost.id == job_id).first()
        local_session.delete(user_to_delete)
        local_session.commit()
        return json.dumps({"status":"ok"})
    except:
        return json.dumps({"status":"fail"})


@app.route('/api/like/jobpost',methods=["GET","POST"])
def like_jobpost():
    try:
        content = request.get_json()
        comment_id = content["comment_id"]
        comment = local_session.query(Comment).filter(Comment.id == comment_id).first()
        comment.Likes += 1
        local_session.commit()
        return json.dumps({"status": "ok"})
    except:
        return json.dumps({"status": "fail"})


@app.route('/api/change/profile/stauts',methods=["GET","POST"])
def change_profile_status():
    try:
        content = request.get_json()
        new_status = content["status"]
        user = local_session.query(Profile).filter(Profile.id == 1).first()
        user.public = new_status
        local_session.commit()
        return json.dumps({"status": "ok"})
    except:
        return json.dumps({"status": "fail"})

@app.route('/api/check/post/jobs',methods=['GET','POST'])
def check_post_job():
    try:
        email = session["email"]
        job_post = local_session.query(JobPost).filter(JobPost.student_email == email).all()
        res = {}
        return json.dumps(res)
    except:
        return json.dumps({"status": "fail"})


@app.route('/api/create/post/jobs')
def create_job_post():


@app.route('/api/update/post/jobs')
def update_job_post():




@app.route('/api/check/post/generals',methods=['GET','POST'])
def check_post_general():
    try:
        email = session["email"]
        general_post = local_session.query(GeneralPost).\
            filter(GeneralPost.student_email == email).all()
        res = {}
        return json.dumps(res)
    except:
        return json.dumps({"status": "fail"})


@app.errorhandler(404)
def index(error):
    return app.send_static_file('index.html')

DB_NAME = 'internshare'
db = pymysql.connect(host='internshare.ctoh8sqi2mdr.ap-southeast-1.rds.amazonaws.com',user='admin',password='Alibaba123..')
cursor = db.cursor()

if __name__ == "__main__":
    cursor.execute(f'CREATE DATABASE IF NOT EXISTS {DB_NAME}')
    db.select_db(DB_NAME)
    cursor.execute('CREATE TABLE IF NOT EXISTS user (id INT(6), lastname VARCHAR(30), firstname VARCHAR(30), email VARCHAR(30))')
    print("ready to run!")
    app.run("127.0.0.1", 5000,debug = "True")
    # export FLASK_ENV=development
    # export FLASK_APP=backend/app.py
    # flask run


