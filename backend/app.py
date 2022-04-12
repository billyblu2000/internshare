from flask import Flask, render_template, request, session, url_for, redirect
import pymysql
from flask_mail import Mail, Message
from flask_session import Session
import OTP
import json
import redis
import datetime
import logging
from colorhash import ColorHash
from werkzeug.security import generate_password_hash, check_password_hash
import env

from database.dataclass import *

local_session=sessions()
codeDict={"yl7002@nyu.edu":"123456"}

app = Flask(__name__, static_url_path='')
# session config
app.config["SESSION_PERMANENT"] = False
app.secret_key = "any random string"


mail = Mail(app)
# mail config
app.config['MAIL_SERVER']='smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = env.email
app.config['MAIL_PASSWORD'] = env.password
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True
mail = Mail(app)

# stop logging path
log = logging.getLogger('werkzeug')
log.disabled = True


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
            if user.password == pw:
                session["role"]="student"
                session["name"] = user.name
                session["color"] = user.color
                session["email"] = email
                return json.dumps({"status":"success"})

            else:
                return json.dumps({"status": "password does not match"})
    # turn to company database
    user = local_session.query(Company).filter(Company.email == email).first()
    if user:
        if check_password_hash(pw,user.password):
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
    print(code)
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
    hashcolor = ColorHash(name).hex
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
    user = session["username"]
    if user:
    # get the major from the databases;
    # get graduation time from the databases;
    # get the desired post from the databases
    # based on job requirements and graduation time
        return json.dumps({"status": "success", "post": {}})
    else:
        # has not logged in yet
        return json.dumps({"status": "failure"})




@app.route("/api/applystatus")
def check_status():
    # returns a list of apply status, each status corresponding to an apply
    # of this user, the status should contain the position name and
    # the company name (if any), and the current status.
    user = session["user"]
    # no status in the applications
    return json.dumps({"status": "success","id":"refuse"})

@app.route("/api/homepage/searchsuggestions")
def hp_search_suggestion():
    
    return json.dumps({"status": "success"})




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
    # export FLASK_ENV=development
    # export FLASK_APP=backend/app.py
    # flask run


