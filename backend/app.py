from flask import Flask, render_template, request, session
from flask_mail import Mail, Message
import json, random

from __init__ import app

from database.dataclass import *



# app = Flask(__name__, static_url_path='')
# # session config
# app.config["SESSION_PERMANENT"] = False
# app.secret_key = "any random string"
#
#
# app.config['MAIL_USE_TLS'] = False
# app.config['MAIL_USE_SSL'] = True
# mail = Mail(app)

# stop logging path
# log = logging.getLogger('werkzeug')
# log.disabled = True

#/backend

# with open(os.getcwd()+'/backend/positions.json', 'r') as f:
#   global_position = json.load(f)

with open(os.getcwd()+'/positions.json', 'r') as f:
  global_position = json.load(f)

# r = redis.Redis(host='localhost', port=6379, db=0)

# for session
# session["email"] = "yl7002@nyu.edu"
# session["type"] = "student"
# session["color"] = "ffffff"
# session["name"] = 'Yumeng Lu'
# session["major"] = "computer science"


# import routes
from backend.routes.loginRegister import loginRegister
app.register_blueprint(loginRegister,url_prefix ="/api/login")

from backend.routes.homepage import homepage
app.register_blueprint(homepage,url_prefix ="/api/homepage")

from backend.routes.jobpost import jobpost
app.register_blueprint(jobpost,url_prefix ="/api/job")

from backend.routes.profile import profile
app.register_blueprint(jobpost,url_prefix ="/api/proflie")

from backend.routes.apply import apply
app.register_blueprint(jobpost,url_prefix ="/api/apply")

from backend.routes.mypost import mypost
app.register_blueprint(jobpost,url_prefix ="/api/mypost")

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


@app.route('/api/change/profile/stauts',methods=["GET","POST"])
def change_profile_status():
    try:
        content = request.get_json()
        new_status = content["status"]
        profile_id = content["profile_id"]
        user = local_session.query(Profile).filter(Profile.id == 1).first()
        user.public = new_status
        local_session.commit()
        return json.dumps({"status": "ok"})
    except:
        return json.dumps({"status": "fail"})


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


