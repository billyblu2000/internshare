from flask import Blueprint,request,session,render_template
from ..database.dataclass import *
import json


mypost = Blueprint('mypost', __name__)

from ..stringfy import stringfy

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
        obj = {
            "id": job.id,
            "is_company": job.is_Company,
            "company_email":job.company_email,
            "student_email": job.student_email,
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
            "color":"",
            "name":"",
        }
        if job.is_Company == 1:
            company = local_session.query(Company).filter(Company.email == job.company_email).first()
            obj["color"] = company.color
            obj["name"] = company.name
        else:
            student = local_session.query(Student).filter(Student.email == job.student_email).first()
            obj["color"] = student.color
            obj["name"] = student.name
        res["result"].append(obj)
    print(res)
    return res
    # except:
    #     return json.dumps({"status": "fail"})

@mypost.route('/create', methods=["GET", "POST"])
def create_mypost():
    try:
        j = request.get_json()
        # jobpost = [
        #     {
        #         "company_name": "tiktok",
        #         "is_Company": True,
        #         "company_email": "tiktok@gmail.com",
        #         "job_description": "database engineer",
        #         "job_requirements": "database major",
        #         "job_start_date": "2022-05-01",
        #         "apply_end_date": "2022-06-29",
        #         "estimate_salary": 50000,
        #         "post_title": "Tiktok database engineer"
        #     }
        # ]
        new_jobpost = JobPost(company_name=j["company_name"], is_Company=j["is_Company"],
                              company_email=j["company_email"],
                              job_description=j["job_description"], job_requirements=j["job_requirements"],
                              job_start_date=j["job_start_date"] \
                              , apply_end_date=j["apply_end_date"], estimate_salary=j["estimate_salary"],
                              post_title=j["post_title"])
        local_session.add(new_jobpost)
        return json.dumps({"status": "ok"})
    except:
        return json.dumps({"status": "fail"})

@mypost.route('/upadte', methods=["GET", "POST"])
def update_mypost():
    try:
        user = local_session.query(JobPost).filter(JobPost.id == 3).first()
        user.apply_end_date = "2022-07-01"
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
    res["applicants"] = []
    result = local_session.query(Application).filter(JobPost.student_email == session["email"]) \
        .filter(Application.post_id == JobPost.id).filter(Application.student_email == Student.email).all()
    print(result)
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
        res["applicants"].append(obj)
    return res
    # except:
    #     return json.dumps({"status": "fail"})

@mypost.route('/accept/application', methods=["GET", "POST"])
def accpet_status():
    try:
        content = request.get_json()
        id = content["application_id"]
        user = local_session.query(Application).filter(Application.id == id).first()
        user.status = "Accept"
        return json.dumps({"status": "ok"})
    except:
        return json.dumps({"status":"fail"})

@mypost.route('/reject/application', methods=["GET", "POST"])
def reject_status():
    try:
        content = request.get_json()
        id = content["application_id"]
        user = local_session.query(Application).filter(Application.id == id).first()
        user.status = "Reject"
        return json.dumps({"status": "ok"})
    except:
        return json.dumps({"status": "fail"})