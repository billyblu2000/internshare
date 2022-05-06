from flask import Blueprint,request,session,render_template
from ..database.dataclass import *
import json

jobpost = Blueprint('jobpost', __name__)

def stringfy(date):
    if date == None:
        return ""
    else:
        return date.strftime("%m/%d/%Y, %H:%M:%S")

@jobpost.route('/detailedinfo',methods=["GET","POST"])
def job_detailed_info():
    try:
        content = request.get_json()
        jobpost_id = content["jobpost_id"]
        job = local_session.query(JobPost).filter(JobPost.id == id).first()

        obj = {
            "id": job.id,
            "is_company": job.company_email,
            "student_email": job.student_email,
            "Datetime": stringfy(job.Datetime),
            "des": job.job_description,
            "requirement": job.job_requirements,
            "start_date": stringfy(job.job_start_date),
            "end_date": stringfy(job.job_end_time),
            "company_name": job.company_name,
            "title": job.post_title,
            "apply_start": stringfy(job.apply_start_date),
            "end_date": stringfy(job.apply_end_date),
            "salary": job.estimate_salary,
        }
        return json.dumps(obj)
    except:
        return json.dumps({"status": "fail"})

@jobpost.route("/getpostcomment",methods = ['GET','POST'])
def comment():
    content = request.get_json()
    id = content["jobpostid"]
    try:
        result = local_session.query(Comment, Student.name, Student.color).filter(Comment.jpost_id == id).filter(
        Comment.student_email == Student.email).all()
        print(len(result))
        res = {}
        res["status"] = "ok"
        res["comment"] = []
        for i in range(len(result)):
            comment = result[i]
            # check if it is first layer
            if comment[0].comment_id == id:
                res["comment"].append({
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
                target = comment[0].comment_id
                for each in res["comment"]:
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
        # print(res)
        return res
    except:
        return json.dumps(
            {
              "status":"post id DNE",
              "comments":[]
            })

@jobpost.route("/apply",methods=["GET","POST"])
def apply_jobpost():
    try:
        content = request.get_json()
        id = content["jobpost_id"]
        email = session["email"]

        return json.dumps({"status": "ok"})
    except:
        return json.dumps({"status": "fail"})

@jobpost.route('/like/comment',methods=["GET","POST"])
def like_comment():
    try:
        content = request.get_json()
        comment_id = content["comment_id"]
        comment = local_session.query(Comment).filter(Comment.id == comment_id).first()
        comment.Likes += 1
        local_session.commit()
        return json.dumps({"status": "ok"})
    except:
        return json.dumps({"status": "fail"})

@jobpost.route("/create/comment",methods=["GET","POST"])
def create_comment():
    try:
        content = request.get_json()
        comment_content = content["content"]
        id = content["id"]
        email = session["email"]
        target = content["target_id"]
        new_data = Comment(content=comment_content,jpost_id=id, comment_id = target,student_email=email)
        local_session.add(new_data)
        local_session.commit()
        return json.dumps({"status":"ok"})
    except:
        return json.dumps({"status":"fail"})

@jobpost.route("/delete/comment",methods=["GET","POST"])
def delete_comment():
    try:
        content = request.get_json()
        comment_id = content["comment_id"]

        local_session.commit()
        return json.dumps({"status":"ok"})
    except:
        return json.dumps({"status":"fail"})

@jobpost.route("/update/comment",methods=["GET","POST"])
def update_comment():
    try:
        content = request.get_json()
        comment_id = content["comment_id"]

        local_session.commit()
        return json.dumps({"status":"ok"})
    except:
        return json.dumps({"status":"fail"})
