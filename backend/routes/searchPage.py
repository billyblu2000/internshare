from flask import Blueprint,request,session
from ..database.dataclass import *
import json
from ..stringfy import stringfy

search = Blueprint('search', __name__)


@search.route("/jobpost",methods = ['GET','POST'])
def search_particular_post_job():
    # try:
    res={"status":"ok","result":[]}
    filter = request.get_json()["filter"]
    page_num = request.get_json()["pagenumber"]
    # search inside the content to get results
    search = "%{}%".format(filter)
    post = local_session.query(JobPost).filter(JobPost.post_title.like(search)).order_by(
        JobPost.Datetime.desc()).all()
    content_list = post[page_num*10-9:(page_num)*10]
    for job in post:
        obj = {
            "job_post_id": job.id,
            "is_company": job.is_Company,
            "company_email": job.company_email,
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
            "color": "",
            "name": "",
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
    return res
    # except:
    #     return json.dumps({"status":"fail"})

@search.route("/general",methods = ['GET','POST'])
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



