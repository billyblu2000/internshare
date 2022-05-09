from flask import Blueprint,request,session,render_template,send_file
from ..database.dataclass import *
import json
from flask_mail import Mail, Message
from ..__init__ import mail
from io import BytesIO
from ..stringfy import stringfy
from ..stringToDate import toDate


jobpost = Blueprint('jobpost', __name__)



@jobpost.route('/detailedinfo',methods=["GET","POST"])
def job_detailed_info():
    try:
        local_session = sessions()
        content = request.get_json()
        jobpost_id = content["jobpost_id"]
        job = local_session.query(JobPost).filter(JobPost.id == jobpost_id).first()
        res = {}
        res["status"]="ok"
        obj = {
            "id": job.id,
            "is_company": job.is_Company,
            "student_email": job.student_email,
            "company_email":job.company_email,
            "Datetime": stringfy(job.Datetime),
            "des": job.job_description,
            "requirement": job.job_requirements,
            "start_date": stringfy(job.job_start_date),
            "end_date": stringfy(job.job_end_time),
            "company_name": job.company_name,
            "title": job.post_title,
            "apply_start": stringfy(job.apply_start_date),
            "apply_end": stringfy(job.apply_end_date),
            "salary": job.estimate_salary,
        }
        if job.is_Company == 1:
            company = local_session.query(Company).filter(Company.email ==job.company_email).first()
            obj["publisher_color"]=company.color
            obj["publisher_name"] =company.name
        else:
            student = local_session.query(Student).filter(Student.email == job.student_email).first()
            obj["publisher_color"] = student.color
            obj["publisher_name"] = student.name
        res["result"]=obj
        local_session.close()
        return res
    except:
        return json.dumps({"status": "fail"})

@jobpost.route("/getpostcomment",methods = ['GET','POST'])
def comment():
    content = request.get_json()
    id = content["jobpostid"]
    try:
        result =  local_session.query(Comment).filter(Comment.jpost_id == id).all()
        res = {}
        res["status"] = "ok"
        res["comment"] = []
        for i in range(len(result)):
            comment  =result[i]
            if comment.comment_id == None:
                obj = {
                    "id": comment.id,
                    # "company_email": comment.company_email,
                    "student_email": comment.student_email,
                    "job_post_id":comment.jpost_id,
                    "content": comment.content,
                    "datetime": stringfy(comment.Datetime),
                    "like":comment.Likes,
                    "root":comment.root,
                    "name":"",
                    "color":"",
                    "descendent":[]
                }
                if (comment.company_email != None):
                    company = local_session.query(Company).filter(Company.email == comment.company_email).first()
                    obj["name"]=company.name
                    obj["color"]=company.color
                else:
                    student = local_session.query(Student).filter(Student.email == comment.student_email).first()
                    obj["name"] = student.name
                    obj["color"] = student.color
                res["comment"].append(obj)
        for i in range(len(result)):
            comment  =result[i]
            if comment.comment_id != None:
                root = comment.root
                for root_comment in res["comment"]:
                    if root == root_comment["id"]:
                        obj = {
                            "id": comment.id,
                            "company_email": comment.company_email,
                            "student_email": comment.student_email,
                            "job_post_id":comment.jpost_id,
                            "content": comment.content,
                            "datetime": stringfy(comment.Datetime),
                            "like":comment.Likes,
                            "name":"",
                            "color":"",
                            "root":comment.root,
                            "descendent":[]
                        }
                        if (comment.company_email != None):
                            company = local_session.query(Company).filter(Company.email == comment.company_email).first()
                            obj["name"]=company.name
                            obj["color"]=company.color
                        else:
                            student = local_session.query(Student).filter(Student.email == comment.student_email).first()
                            obj["name"] = student.name
                            obj["color"] = student.color
                        root_comment["descendent"].append(obj)
        print("get comment:\n",res)
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
        print(content)
        id = content["jobpost_id"]
        email = session["email"]
        # name = session["name"]
        # method= content["method"]
        # publisher = content["publisher"]
        # if method=="cv":
        #     # download cv
        #     msg = Message(subject="%s is applying for job %s".format(name,id),
        #                   sender="anh422@nyu.edu", \
        #                   recipients=[email])
        #     f = local_session.query(CV).filter(CV.email == email).first()
        #     msg.attach(f.filename, "image/png", BytesIO(f.data))
        #     mail.send(msg)

        local_session.execute(text("INSERT INTO applications(student_email,post_id) VALUES('{}',{})".format(email, id)))


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

        return json.dumps({"status": "ok"})
    except:
        return json.dumps({"status": "fail"})

@jobpost.route("/create/comment",methods=["GET","POST"])
def create_comment():
    # try:
    content = request.get_json()
    id = content["jobpost_id"]
    comment_content = content["content"]
    email = session["email"]
    target = int(content["target_id"])
    root = int(content["root"])
    id = int(content['jobpost_id'])
    print(content)
    print(id)
    print(comment_content, target, root,email)
    local_session.execute(text("INSERT INTO comments(content,jpost_id,comment_id,root,student_email,Likes) VALUES('{}',{},{},{},'{}',0)".format(comment_content, id, target, root, email)))
    return json.dumps({"status":"ok"})
    # except:
    #     return json.dumps({"status":"fail"})

@jobpost.route("/delete/comment",methods=["GET","POST"])
def delete_comment():
    try:
        content = request.get_json()
        comment_id = content["comment_id"]
        comment_to_delete = local_session.query(Comment).filter(Comment.id == comment_id).first()
        local_session.delete(comment_to_delete)

        return json.dumps({"status":"ok"})
    except:
        return json.dumps({"status":"fail"})

@jobpost.route("/update/comment",methods=["GET","POST"])
def update_comment():
    try:
        content = request.get_json()
        comment_id = content["comment_id"]
        new_content = content["new_content"]
        comment_to_update = local_session.query(Comment).filter(Comment.id == comment_id)\
            .update({Comment.content : new_content}, synchronize_session='fetch')
        return json.dumps({"status":"ok"})
    except:
        return json.dumps({"status":"fail"})
