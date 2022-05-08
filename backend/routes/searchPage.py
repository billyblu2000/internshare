from flask import Blueprint,request,session
from ..database.dataclass import *
import json


search = Blueprint('search', __name__)

@search.route("/jobpost",methods = ['GET','POST'])
def search_particular_post_job():
    try:
        filter = request.args["filter"]
        res = {"status":"ok","result":[]}
        page_num = request.args["pagenumber"]
        # search inside the content to get results
        post = local_session.query(JobPost).all()
        content_list = []
        for i in post:
            content_list.append(post[i].job_description)
        for job in post:
            res["result"] = {
                "id":job.id,
                "title": job.title,
                "date": job.Datetime,
                "description": job.job_description,
                "company": job.company_name,
                "student_email": job.student_email,
                "requirement": job.jon_requirements,
            }
        return json.dumps(res)
    except:
        return json.dumps({"status":"fail"})

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



