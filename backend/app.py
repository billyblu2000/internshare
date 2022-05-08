from flask import Flask, render_template, request, session
from flask_mail import Mail, Message
import json, random

from __init__ import app

from database.dataclass import *

local_session = sessions()


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
app.register_blueprint(profile,url_prefix ="/api/profile")

from backend.routes.apply import apply
app.register_blueprint(apply,url_prefix ="/api/apply")

from backend.routes.mypost import mypost
app.register_blueprint(mypost,url_prefix ="/api/mypost")

from backend.routes.searchPage import search
app.register_blueprint(search,url_prefix ="/api/search")

@app.route("/api/homepage/searchsuggestions",methods = ['POST'])
def hp_search_suggestion():
    content = request.get_json()["content"]
    print(request.get_json())
    print(content)
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


