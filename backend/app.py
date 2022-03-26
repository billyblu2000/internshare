from flask import Flask, render_template, request, session, url_for, redirect
import pymysql
from flask_mail import Mail, Message
import OTP

app = Flask(__name__, static_url_path='')
mail = Mail(app)


# mail config
app.config['MAIL_SERVER']='smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = 'yl7002@nyu.edu'
app.config['MAIL_PASSWORD'] = ''# have to enable chrome to be less secure
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True
mail = Mail(app)

tmp_code = {}

@app.route('/api/login',method = ['GET','POST'])
def login():
    # when login, need to specify them as company or student?
    email = request.get_json("email")
    pw = request.get_json("password")
    print(email,pw)
    cursor = db.cursor()
    query = 'SELECT password FROM user WHERE email = %s'
    cursor.execute(query, email)
    db_pw = cursor.fetchone()
    cursor.close()
    if db_pw:
        if db_pw == pw:
            return {"status":"success"}
        return {"status":"password does not match"}
    else:
        return {"status":"user DNE"}

@app.route('/api/register/student/sendemail',method = ['GET','POST'])
def send_verification_email():
    code = OTP.generateOTP()# preserve in database??
    print(code)
    try:
        username = request.get_json("email")
    except:
        username = "1065465727@qq.com"
    tmp_code[username] = code
    msg = Message(subject = 'Thank you for registering for NYUSH Internshare platform!', sender='yl7002@nyu.edu', \
                  recipients=[username])
    # the template need to be modifed
    msg.html = render_template("email_template.html",name=username,code=code)
    mail.send(msg)
    return {"status":"success"}


@app.route('/api/register/student/verify',method = ['GET','POST'])
def verify_code():
    print(tmp_code)
    username = request.get_json("email")
    enter = request.get_json("code")
    code = tmp_code[username]
    if enter == code:
        return {"status":"success"}
    return {"status": "code does not match"}


@app.route('/api/register/student',method = ['GET','POST'])
def student_register():
    email = request.get_json("email")
    pw = request.get_json("password")
    pw2 = request.get_json("confirm_pw")
    if pw != pw2:
        return {"status":"password does not match"}
    cursor = db.cursor()
    query = 'SELECT * FROM user WHERE email = %s'
    cursor.execute(query, email)
    ppl = cursor.fetchone()
    if ppl:
        cursor.close()
        return {"status":"user already exists"}
    insertion = 'INSERT INTO user VALUES(%s, %s, %s, %s)'
    cursor.execute(insertion,(email,pw))
    cursor.close()
    return {"status":"success"}


@app.route('/api/register/company',method = ['GET','POST'])
def company_register():
    email = request.get_json("email")
    pw = request.get_json("password")
    pw2 = request.get_json("confirm_pw")
    verification = request.get_json("verification")
    if pw != pw2:
        return {"status":"password does not match"}
    cursor = db.cursor()
    query = 'SELECT * FROM user WHERE email = %s'
    cursor.execute(query, email)
    ppl = cursor.fetchone()
    if ppl:
        cursor.close()
        return {"status":"user already exists"}
    insertion = 'INSERT INTO user VALUES(%s, %s, %s, %s)'
    cursor.execute(insertion,(email,pw))
    cursor.close()
    return {"status":"success"}

@app.route('/api/register/company/verify',method = ['GET','POST'])
def company_verify():
    # need api?
    return {"status":"success"}



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
    print(1)
    app.run("127.0.0.1", 5000,debug = "True")
    # export FLASK_ENV=development
    # export FLASK_APP=backend/app.py
    # flask run


