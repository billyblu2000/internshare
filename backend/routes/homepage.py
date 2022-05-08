from flask import Blueprint,request,session,render_template
from ..database.dataclass import *
import json

homepage = Blueprint('homepage', __name__)


def stringfy(date):
    if date == None:
        return ""
    else:
        return date.strftime("%m/%d/%Y, %H:%M:%S")


@homepage.route("/recommendpost/jobs",methods=["GET","POST"])
def recommendPostjobs():
    # get the major from the databases;
    # get graduation time from the databases;
    # get the desired post from the databases
    # based on job requirements and graduation time
    try:
        print("session is here")
        res = {"status":"ok"}
        res["result"]=[]
        if "major" in session:
            major = session["major"]
        # search for five jobPosts and five General Posts
        # how to retreive the data
        # get the job post id
        print(major)
        result = local_session.query(PostHashtag).filter(PostHashtag.hashtag == major).all()
        list_id = []
        for i in range(len(result)):
            list_id.append(result[i].jobpost_id)
        print(list_id) #[3,4]
        local_session.close()
        # cur job post
        for id in list_id:
            job = local_session.query(JobPost).filter(JobPost.id == id).first()
            print(job)
            res["result"].append({
                "id":job.id,
                "title": job.post_title,
                "date": stringfy(job.Datetime),
                "description": job.job_description,
                "company": job.company_name,
                "student_email": job.student_email,
                "requirement": job.job_requirements,
                "publisher_color":"#bf3f84",
                "publisher_name":"Daisy",
            })
            local_session.close()
        print(res)
        return json.dumps(res)
    except:
        return json.dumps({"stauts":"fail"})

@homepage.route("/recommendpost/generals",methods=["GET","POST"])
def recommendPostGenerals():
    try:
        res = {"status":"ok","result":[]}
        generalposts = local_session.query(GeneralPost).order_by(GeneralPost.Datetime.desc()).limit(5).all()
        content_list = []
        for i in range(min(5,len(generalposts))):
            general =generalposts[i]
            res["result"].append({
                "id":general.id,
                "studennt_email": general.student_email,
                "company": general.company_email,
                "content": general.content,
                "title": general.post_title,
                "date": general.Datetime
            })
        return json.dumps(res)
    except:
        return json.dumps({"stauts":"fail"})

@homepage.route("/applystatus",methods=["GET","POST"])
def check_status():
    print("applystatus")
    # returns a list of apply status, each status corresponding to an apply
    # of this user, the status should contain the position name and
    # the company name (if any), and the current status.
    try:
        # email = session["email"]
        email = "yl7002@nyu.edu"
        result = local_session.query(Application).filter(Application.student_email == email).all()
        res = {"status": "ok","result":[]}
        print(res)
        local_session.close()
        # retrieve all info abt the job
        for i in range(len(result)):
            cur = result[i]
            post_id = cur.post_id
            status = cur.status
            print(status, post_id)
            job_info = local_session.query(JobPost).filter(JobPost.id == post_id).first()
            res["result"].append({
                "id": job_info.id,
                "status": status,
                "title": job_info.post_title,
                "company_name": job_info.company_name,
                "start": stringfy(job_info.job_start_date),
                "end": stringfy(job_info.job_end_time),
                "publisher_color":"#bf3f84",
                "publisher_name":"Daisy",
            })
            local_session.close()
        print(res)
        return res
    except:
        return json.dumps({"stauts":"fail"})
