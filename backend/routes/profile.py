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
            email = content["email"]
        else:
            email = session["email"]
        # retireive all job appllicants of a person
        all = [session["email"]]
        appli = local_session.query(Application.student_email).filter(JobPost.student_email == session["email"])\
            .filter(Application.post_id == JobPost.id).filter(Application.student_email == Student.email).all()
        for i in appli:
            all.append(i)
        user = local_session.query(Profile).filter(Profile.email == email).first()

        user_detailed = local_session.query(Student).filter(Student.email == email).first()

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
        print(res)
        return res

    except:
        return json.dumps({"status":"fail"})

@profile.route('/update', methods=["GET", "POST"])
def update_profile():
    # try:
    user = local_session.query(Profile).filter(Profile.email == session["email"]).first()
    if not user:
        return json.dumps({"status":"user DNE"})
    j = request.get_json()
    print(j["skills"])
    # user = local_session.query(Profile).filter(Profile.email == session["email"])\
    #     .update({Profile.email: session["email"]}, synchronize_session='fetch')
    # user = local_session.query(Profile).filter(Profile.email == session["email"])\
    #     .update({Profile.name: session["name"]}, synchronize_session='fetch')
    # user = local_session.query(Profile).filter(Profile.email == session["email"])\
    #     .update({Profile.project_experience: j["project_experience"]}, synchronize_session='fetch')
    # user = local_session.query(Profile).filter(Profile.email == session["email"])\
    #     .update({Profile.internship_experience: j["internship_experience"]}, synchronize_session='fetch')
    # user = local_session.query(Profile).filter(Profile.email == session["email"])\
    #     .update({Profile.education_background: j["education_background"]}, synchronize_session='fetch')
    # user = local_session.query(Profile).filter(Profile.email == session["email"])\
    #     .update({Profile.awards: j["awards"]}, synchronize_session='fetch')
    # user = local_session.query(Profile).filter(Profile.email == session["email"])\
    #     .update({Profile.activities: j["activities"]}, synchronize_session='fetch')
    user = local_session.query(Profile).filter(Profile.email == session["email"])\
        .update({Profile.skills: j["skills"]}, synchronize_session='fetch')
    # user = local_session.query(Profile).filter(Profile.email == session["email"]) \
    #     .update({Profile.public: j["public"]}, synchronize_session='fetch')

    return json.dumps({"status":"ok"})
    # except:
    #     return json.dumps({"status":"fail"})

@profile.route('/upload', methods=["GET", "POST"])
def upload_cv():
    try:
        f = request.files["file"]
        cv = local_session.query(CV).filter(Profile.email == session["email"]).filter(CV.id == Profile.CV_id).first()
        if not cv:
            local_session.execute(text("""INSERT INTO cvs(pdf_path) VALUES("new.pdf")"""))

            cv_id = local_session.query(CV.id).filter(CV.pdf_path == 'new_pdf').first()
            cv_id = cv_id[0]

            cvv = local_session.query(Profile).filter(Profile.email == session["email"]) \
                .update({Profile.CV_id: cv_id}, synchronize_session='fetch')
        cv = local_session.query(CV).filter(Profile.email == session["email"]).filter(CV.id == Profile.CV_id) \
            .update({CV.data: f.read()}, synchronize_session='fetch')
        cv = local_session.query(CV).filter(Profile.email == session["email"]).filter(CV.id == Profile.CV_id) \
            .update({CV.pdf_path: f.filename}, synchronize_session='fetch')
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
        # new_profile = Profile(email=session["email"], name=session["name"],
        #                       project_experience=j["project_experience"],
        #                       internship_experience=j["internship_experience"],
        #                       education_background=j["education_background"] \
        #                       , awards=j["awards"], activities=j["activities"], skills=j["skills"],
        #                       public=j["public"])
        # local_session.add(new_profile)

        local_session.execute(text("INSERT INTO profiles(email,name,project_experience,internship_experience,education_background,awards,activities,skills,public) VALUES('{}','{}','{}','{}','{}','{}','{}','{}',{})"
                                   .format(session["email"], session["name"], j["project_experience"],j["internship_experience"], j["education_background"], j["awards"], j["activities"], j["skills"],j["public"])))


        return json.dumps({"status": "ok"})
    except:
        return json.dumps({"status":"fail"})

@profile.route('/getname', methods=["GET", "POST"])
def getusername():
    try:
        name = session["name"]
        color = session["color"]
        res = {"status":"ok","name":name,"color":color}
        return res
    except:
        return json.dumps({"status":"fail"})

@profile.route('/download', methods=["GET"])
def download_profile():
    try:
        f = local_session.query(CV).filter(Profile.email == session["email"])\
            .filter(CV.id == Profile.CV_id).first()
        return send_file(BytesIO(f.data),attachment_filename=f.pdf_path,as_attachment=True)
    except:
        return json.dumps({"status":"fail"})

@profile.route('/changesvisibility', methods=["GET", "POST"])
def change_visibility():
    try:
        content = request.get_json()
        new_status = content["status"]
        profile_id = content["profile_id"]
        print(profile_id,new_status)
        user = local_session.query(Profile).filter(Profile.id == profile_id).first()
        user.public = new_status

        return json.dumps({"status": "ok"})
    except:
        return json.dumps({"status": "fail"})