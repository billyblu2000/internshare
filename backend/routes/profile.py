from flask import Blueprint,request,session,send_file
from ..database.dataclass import *
import json
from io import BytesIO


profile = Blueprint('profile', __name__)

@profile.route('/get', methods=["GET", "POST"])
def get_profile():
    try:
        content = request.get_json()
        if content["email"]:
            email =content["email"]
        else:
            email = session["email"]
        # retireive all job appllicants of a person

        all = [session["email"]]
        # all = 1
        user = local_session.query(Profile).filter(Profile.email == email).first()
        local_session.commit()
        local_session.close()
        user_detailed = local_session.query(Student).filter(Student.email == email).first()
        local_session.commit()
        local_session.close()

        if (user.email not in all) and (user.public == 0):
            return json.dumps({"status":"Not available"})
        res = {"status":"ok"}
        obj={
            "id":user.id,
            "email":user.email,
            "name":user.name,
            "cv_id":user.CV_id,
            "project":user.project_experience,
            "internship":user.internship_experience,
            "education":user.education_background,
            "awards":user.awards,
            "activity":user.activities,
            "skills":user.skills,
            "public":user.public,
            "year":user_detailed.graduation_time,
            "major":user_detailed.major,
            "color":user_detailed.color
        }
        res["result"] = obj
        return res
    except:
        return json.dumps({"status":"fail"})

@profile.route('/update', methods=["GET", "POST"])
def update_profile():
    try:
        session["email"] = "yl7002@nyu.edu"
        user = local_session.query(Profile).filter(Profile.email == session["email"]).first()
        local_session.commit()
        local_session.close()
        if not user:
            return json.dumps({"status":"user DNE"})
        j = request.json()
        user.email = session["email"]
        user.name = session["name"]
        # user.project_experience = "No project expereince"
        j["project_experience"]
        user.internship_experience = j["internship_experience"]
        user.education_background = j["education_background"]
        user.awards = j["awards"]
        user.activities = j["activities"]
        user.skills = j["skills"]
        user.public = j["public"]
        local_session.commit()
        return json.dumps({"status":"ok"})
    except:
        return json.dumps({"status":"fail"})

@profile.route('/upload', methods=["GET", "POST"])
def upload_cv():
    try:
        f = request.files["profile"]
        cv = local_session.query(CV).filter(Profile.email == session["email"]).first()
        local_session.commit()
        local_session.close()
        cv.pdf_path = f.filename
        cv.data= f.read()
        local_session.commit()
        return json.dumps({"status": "ok"})
    except:
        return json.dumps({"status":"fail"})

@profile.route('/create', methods=["GET", "POST"])
def create_profile():
    try:
        j = request.json()
        # profile = [{
        #     "email": "yl7002@nyu.edu",
        #     "name": "YuMeng",
        #     "CV_id": 2,
        #     "project_experience": "InternSHare",
        #     "internship_experience": "Google",
        #     "education_background": "NYU Shanghai",
        #     "awards": "First Prize Hackathon",
        #     "activities": "tutor",
        #     "skills": "Java, Python, C++",
        #     "public": True,
        # }
        # ]
        # for j in profile:
        new_profile = Profile(email=session["email"], name=session["name"],
                              project_experience=j["project_experience"],
                              internship_experience=j["internship_experience"],
                              education_background=j["education_background"] \
                              , awards=j["awards"], activities=j["activities"], skills=j["skills"],
                              public=j["public"])
        local_session.add(new_profile)
        local_session.commit()
        local_session.close()
        return json.dumps({"status": "ok"})
    except:
        return json.dumps({"status":"fail"})


@profile.route('/getname', methods=["GET", "POST"])
def getusername():
    try:
        name = session["name"]
        res = {"status":"ok","name":name}
        return res
    except:
        return json.dumps({"status":"fail"})

@profile.route('/download', methods=["GET", "POST"])
def download_profile():
    try:
        email = session["email"]
        f = local_session.query(CV).filter(CV.email == email).first()
        local_session.commit()
        local_session.close()
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
        local_session.close()
        return json.dumps({"status": "ok"})
    except:
        return json.dumps({"status": "fail"})