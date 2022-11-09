from flask import Blueprint,request,session
from ..database.dataclass import *
import json
from datetime import date

mypost = Blueprint('mypost', __name__)

from backend.static.utils.stringfy import stringfy

@mypost.route('/get', methods=["GET", "POST"])
def get_mypost():
    # try:
        email = session["email"]
        res = {}
        res["status"]="ok"
        res["result"] = []
        student_color = local_session.query(Student).filter(Student.email == email).first().color
        job_post = local_session.query(JobPost).filter(JobPost.student_email == email).all()
        for job in job_post:
            print(type(job.job_start_date), type(job.job_end_time))
            obj = {
                "id": job.id,
                "is_company": job.is_Company,
                "company_email":job.company_email,
                "student_email": job.student_email,
                # "Datetime": stringfy(job.Datetime),
                "des": job.job_description,
                "requirement": job.job_requirements,
                "start_date": stringfy(job.job_start_date),
                "end_date": stringfy(job.job_end_time),
                "company_name": job.company_name,
                "title": job.post_title,
                "apply_start": stringfy(job.apply_start_date),
                "apply_end": stringfy(job.apply_end_date),
                "salary": job.estimate_salary,
                "color":"",
                "name":"",
            }
            if job.is_Company == True:
                company = local_session.query(Company).filter(Company.email == job.company_email).first()
                obj["color"] = company.color
                obj["name"] = company.name
            else:
                student = local_session.query(Student).filter(Student.email == job.student_email).first()
                obj["color"] = student.color
                obj["name"] = student.name
            res["result"].append(obj)
        return res
    # except:
    #     return json.dumps({"status": "fail"})

@mypost.route('/create', methods=["GET", "POST"])
def create_mypost():
    # try:
        j = request.get_json()
        # print(j["job_start_date"])
        # print(toDate(j["job_start_date"]),type(toDate(j["job_start_date"])))
        # print(toDate(j["job_end_date"]), type(toDate(j["job_end_date"])))
        # print(type(j["job_start_date"]))
        cur = date.today()
        local_session.execute(text("INSERT INTO jobPosts(student_email,company_name,is_Company,Datetime,job_description,"
                                   "job_requirements,job_start_date,apply_end_date,estimate_salary,post_title) VALUES('{}','{}',{},'{}','{}','{}','{}','{}',{},'{}')"
                                   .format(session["email"],j["company_name"], j["is_Company"],cur, j["job_description"], j["job_requirements"],j["job_start_date"],j["apply_end_date"],int(j["estimate_salary"]),j["post_title"])))
        return json.dumps({"status": "ok"})
    # except:
    #     return json.dumps({"status": "fail"})

@mypost.route('/upadte', methods=["GET", "POST"])
def update_mypost():
    try:
        j = request.get_json()
        # company_name = j["company_name"], is_Company = j["is_Company"],
        # company_email = j["company_email"],
        # job_description = j["job_description"], job_requirements = j["job_requirements"],
        # job_start_date = j["job_start_date"] \
        #     , apply_end_date = j["apply_end_date"], estimate_salary = j["estimate_salary"],
        # post_title = j["post_title"]
        # user = local_session.query(JobPost).filter(JobPost.id == id)\
        #     .update({JobPost.apply_end_date: content[""]},synchronize_session='fetch')
        json.dumps({"status": "ok"})
    except:
        return json.dumps({"status": "fail"})

@mypost.route('/delete', methods=["GET", "POST"])
def delete_mypost():
    try:
        content = request.get_json()
        job_id = content["job_id"]
        user_to_delete = local_session.query(JobPost).filter(JobPost.id == job_id).first()
        local_session.delete(user_to_delete)
        return json.dumps({"status": "ok"})
    except:
        return json.dumps({"status": "fail"})

@mypost.route('/viewall', methods=["GET", "POST"])
def viewall_myapplicants():
    # try:
    res = {}
    res["status"] = "ok"
    res["result"] = []
    result = local_session.query(Application).filter(JobPost.student_email == session["email"]) \
        .filter(Application.post_id == JobPost.id).filter(Application.student_email == Student.email).all()
    for i in range(len(result)):
        applicant = result[i]
        student = local_session.query(Student).filter(Student.email == applicant.student_email).first()
        obj = {
        "id":applicant.id,
        "student_email":applicant.student_email,
        "post_id":applicant.post_id,
        "is_online":applicant.isOnline,
        "create_time":stringfy(applicant.Datetime),
        "status":applicant.status,
        "name":student.name,
        "year":student.graduation_time,
        "major":student.major,
        }
        res["result"].append(obj)
    print(res)
    return res
    # except:
    #     return json.dumps({"status": "fail"})

@mypost.route('/accept/application', methods=["GET", "POST"])
def accpet_status():
    try:
        content = request.get_json()
        id = content["application_id"]
        user = local_session.query(Application).filter(Application.id == id)\
            .update({Application.status : "Accept"},synchronize_session='fetch')
        return json.dumps({"status": "ok"})
    except:
        return json.dumps({"status":"fail"})

@mypost.route('/reject/application', methods=["GET", "POST"])
def reject_status():
    try:
        content = request.get_json()
        id = content["application_id"]
        user = local_session.query(Application).filter(Application.id == id)\
            .update({Application.status : "Reject"},synchronize_session='fetch')
        return json.dumps({"status": "ok"})
    except:
        return json.dumps({"status": "fail"})