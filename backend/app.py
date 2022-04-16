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

with open(os.getcwd()+'/positions.json', 'r') as f:
  global_position = json.load(f)


# r = redis.Redis(host='localhost', port=6379, db=0)

# for session
# session["email"] = email
# session["type"] = "student"
# session["color"] = color
# session["name'] = username


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

@app.route("/api/recommendpost")
def recommendPost():
    # get the major from the databases;
    # get graduation time from the databases;
    # get the desired post from the databases
    # based on job requirements and graduation time
    if "major" in session:
        major = session["major"]

    # search for five jobPosts and five General Posts
    # how to retreive the data

    # 10 job posts
    jobs = local_session.query()

    # based on time descendent
    generals = local_session.query()

    res = {
        "job": {},
        "general": {}
    }
    for job in jobs:
        res["job"][job.id] = {
            "title": job.title,
            "date": job.Datetime,
            "description": job.job_description,
            "company": job.company_name,
            "student_email": job.student_email,
            "requirement": job.jon_requirements,
        }
    for general in generals:
        res["general"][general.id] = {
            "studennt_email": general.student_email,
            "company": general.company_email,
            # company email or company name
            # why need company email or student_email
            "content": general.content,
            "title": general.title,
            "publishser": general.publisher_email,
            "date": general.Datetime
        }
    res["status"] = "success"
    return json.dumps(res)




@app.route("/api/applystatus")
def check_status():
    # returns a list of apply status, each status corresponding to an apply
    # of this user, the status should contain the position name and
    # the company name (if any), and the current status.
    email = session["email"]
    result = local_session.query(Application).filter(Application.student_email == email).all()
    res = {}
    for i in range(len(result)):
        cur = result[i]
        post_id = cur.post_id
        status = cur.status
        res[post_id] = status
    res["status"] = "success"
    # no status in the applications
    return json.dumps(res)

@app.route("/api/homepage/searchsuggestions",methods = ['GET'])
def hp_search_suggestion():
    # content = request.args["content"]
    content = "soft"
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


@app.route("/api/homepage/searchone",methods = ['GET','POST'])
def search_particular_post():
    filter = request.args["filter"]
    # search inside the content to get results
    jobs = local_session.query()
    generals = local_session.query()
    res = {
        "job": {},
        "general": {}
    }
    for job in jobs:
        res["job"][job.id] = {
            "title": job.title,
            "date": job.Datetime,
            "description": job.job_description,
            "company": job.company_name,
            "student_email": job.student_email,
            "requirement": job.jon_requirements,
        }
    for general in generals:
        res["general"][general.id] = {
            "studennt_email": general.student_email,
            "company": general.company_email,
            # company email or company name
            # why need company email or student_email
            "content": general.content,
            "title": general.title,
            "publishser": general.publisher_email,
            "date": general.Datetime
        }
    res["status"] = "success"
    return json.dumps(res)


@app.route("/getpost")
def comment():
    return json.dumps()

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
    app.run("127.0.0.1", 5000,debug = "True")
    print("ready to run!")
    # export FLASK_ENV=development
    # export FLASK_APP=backend/app.py
    # flask run


# - Hash tag relation ship, major and related hashtag, also users’ personal interest
