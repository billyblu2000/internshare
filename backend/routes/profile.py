from flask import Blueprint,request,session,send_file
from ..database.dataclass import *
import json
from io import BytesIO

profile = Blueprint('profile', __name__)

@profile.route('/get', methods=["GET", "POST"])
def get_profile():
    try:
        email = session["email"]
        user = local_session.query(Profile).filter(Profile.email == email).first()
        obj={

        }
        return json.dumsp(obj)
    except:
        return json.dumps({"status":"fail"})

@profile.route('/update', methods=["GET", "POST"])
def update_profile():
    try:
        user = local_session.query(Profile).filter(Profile.email == "anh422@nyu.edu").first()
        user.project_experience = "WiCode, InternSHare Project"
        local_session.commit()
        return json.dumps({"status":"ok"})
    except:
        return json.dumps({"status":"fail"})

@profile.route('/upload', methods=["GET", "POST"])
def upload_profile():
    try:
        f = request.files["profile"]
        f.filename,f.read()
        return json.dumps({"status": "ok"})
    except:
        return json.dumps({"status":"fail"})

@profile.route('/create', methods=["GET", "POST"])
def create_profile():
    try:
        return json.dumps({"status": "ok"})
    except:
        return json.dumps({"status":"fail"})
    profile = [{
        "email": "yl7002@nyu.edu",
        "name": "YuMeng",
        "CV_id": 2,
        "project_experience": "InternSHare",
        "internship_experience": "Google",
        "education_background": "NYU Shanghai",
        "awards": "First Prize Hackathon",
        "activities": "tutor",
        "skills": "Java, Python, C++",
        "public": True,
    }
    ]
    for j in profile:
        new_profile = Profile(email=j["email"], name=j["name"], CV_id=j["CV_id"],
                              project_experience=j["project_experience"],
                              internship_experience=j["internship_experience"],
                              education_background=j["education_background"] \
                              , awards=j["awards"], activities=j["activities"], skills=j["skills"], public=j["public"])
        local_session.add(new_profile)
        local_session.commit()


@profile.route('/getname', methods=["GET", "POST"])
def getusername():
    try:
        email = session["email"]
        name = session["name"]
        return json.dumps({"status":"fail","name":name})
    except:
        return json.dumps({"status":"fail"})

@profile.route('/download', methods=["GET", "POST"])
def download_profile():
    try:
        f =
        return send_file(BytesIO(f.data),attachment_filename=f.filename,as_attachment=True)
    except:
        return json.dumps({"status":"fail"})

@profile.route('/changesvisibility', methods=["GET", "POST"])
def change_visibility():
    try:
        content = request.get_json()
        new_status = content["status"]
        profile_id = content["profile_id"]
        user = local_session.query(Profile).filter(Profile.id == profile_id).first()
        user.public = new_status
        local_session.commit()
        return json.dumps({"status": "ok"})
    except:
        return json.dumps({"status": "fail"})