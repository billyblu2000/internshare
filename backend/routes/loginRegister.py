from flask import Blueprint,request,session,render_template
from werkzeug.security import generate_password_hash,check_password_hash
from ..database.dataclass import *
from ..OTP import generateOTP
import json
from ..color_generator import generate_background_color
from flask_mail import Mail, Message
from ..__init__ import mail

loginRegister = Blueprint('loginRegister', __name__)


# login page

@loginRegister.route('',methods = ['GET','POST'])
def login():
    print("here")
    # when login, need to specify them as company or student?
    content = request.get_json()
    pw = content['password']
    email=content['email']
    print(pw,email)
    if "@nyu.edu" in email:
        user = local_session.query(Student).filter(Student.email == email).first()
        print(user)
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


codeDict = {}
# register
@loginRegister.route('student/sendemail',methods = ['GET','POST'])
def send_verification_email():
    code = generateOTP() # preserve in database??
    try:
        content = request.get_json()
        username = content["email"]
    except:
        return json.dumps({"status": "no email"})
    # set the expiration time to be 15 minutes
    # r.set(username,code,60*15)
    codeDict[username] = code
    print(code)
    msg = Message(subject = 'Thank you for registering for NYUSH Internshare platform!', sender = "anh422@nyu.edu",\
                  recipients=[username])
    msg.html = render_template("email_template.html",name= username,code=code)
    mail.send(msg)
    return json.dumps({"status":"success"})

# verify
# student
@loginRegister.route('student/verify',methods = ['GET','POST'])
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

@loginRegister.route('/register/student',methods = ['GET','POST'])
def student_register():
    content = request.get_json()
    name = content["name"]
    email = content["email"]
    pw = content["password"]
    pw2 = content["confirPW"]
    if pw != pw2:
        return json.dumps({"status":"password does not match"})
    std = local_session.query(Student).filter(Student.email == email).first()
    local_session.commit()
    if std:
        return json.dumps({"status":"user already exists"})
    major = content["major"]
    year = content["year"]
    hashpw = generate_password_hash(pw)
    hashcolor = generate_background_color()
    new_student = Student(name= name, email= email, password= hashpw, major=major,
                          graduation_time=year,personalityTestResults="", color=hashcolor)
    local_session.add(new_student)
    return json.dumps({"status":"success"})

# company
# register
@loginRegister.route('/register/company',methods = ['GET','POST'])
def company_register():
    email = request.get_json("email")

    pw = request.get_json("password")
    pw2 = request.get_json("confirm_pw")
    verification = request.get_json("verification")
    if pw != pw2:
        return json.dumps({"status":"password does not match"})
    cmpy = local_session.query(Student).filter(Student.email == email).first()


    # if cmpy:
    #     cursor.close()
    #     return json.dumps({"status":"user already exists"})
    # insertion = 'INSERT INTO user VALUES(%s, %s, %s, %s)'
    # cursor.execute(insertion,(email,pw))
    # cursor.close()
    # return json.dumps({"status":"success"})

@loginRegister.route('/company/verify',methods = ['GET','POST'])
def company_verify():
    # need api?
    return json.dumps({"status":"success"})

