"""
from app import User, session,Address

local_session=session()

1。 login
SELECT password FROM user WHERE email = %s

email = %s
user = local_session.query(student).filter(Student.email==email).first()

2.student_register
SELECT * FROM user WHERE email = %s
email = %s
user = local_session.query(user).filter(User.email==email).first()

INSERT INTO user VALUES()
user_to_update=local_session.query(User).filter(User.email==email).first()

user_to_update.username = "abcd"
user_to_update.email="abcd@company.com"
(or insert any other values to any columns)

local_session.commit()


3. recommendPost:
given:
variable name: major (which is the major of the students)
need:
10 job post related to that major and five latest general post
return type:
all job's information should be returned (i.e. no need to use SELECT)

I assume you mean like SELECT * (if not pls tell me haha)

result = local_session.query(postHashtags).filter(postHashtags.hashtag=="major").all()

#maybe if you want 10 job then you can do iteration on the answer
and take the top 10 that returned for example

list_id=[]
for i in result:
list_id.append(result[i].jobpost_id)

#and then maybe check if the list_id have more than 10 or not if more than 10 then
iteration to take the first 10 out

for id in list_id:
jobpost = local_session.query(jobPosts).filter(jobPosts.id == id).all()

#this is to return the jobpost information and maybe you want to save it in a list?

generalposts = local_session.query(GeneralPost).order_by(generalPosts.Datetime.desc()).limit(5).all()

#iterate again to get 5? haha



4. search_particular_post
given:
variable name: filter (which is the content the user entered in the search box)
return:
all job posts that are related to the content and each should contain all job's info
as well as all general posts info related to the content

#wait i think like for this one might need a little bit of your job, like maybe first return all
the jobpost content and then try to find if the filter word or phrase exist in the content
by using python? haha then if it exist then save that jobpost in a list or sth like that.

#query to return the title LIKE tags of post

search = "%{}%".format("intern")
posts = local_session.query(JobPost).filter(JobPost.post_title.like(search)).order_by(JobPost.Datetime.desc()).all()



5. check_status
varaible name: email
given student email and check that student's job application status,
only given back the job post id and status

result = local_session.query(applications).filter(applications.student_email == email).all()
jobpostid_list = []
status = []
or maybe do like a dictionary with jobpost id as key and status as value

result[i].post_id #return the post_id
result[i].status #return the status



6. Given a job post id, retrieve all comment related to that job post, if it is a
student, join the table with student to get student name and color as well:
i.e the returned columns should look like:

id, company_email, student_email, jpost_id, comment_id,
content,Datetime, Likes, student_name, student_color

result = local_session.query(Comment,Student.name,Student.color).filter(Comment.jpost_id == 2).filter(
Comment.student_email == Student.email).all()


+ 7. given content, jpost_id, student_email, write the comment into comment table

data=[
    {
        "content":"heyheyhey",
        "jpost_id":"2",
        "student_email":"yl7002@nyu.edu"
    }
]

for a in data:
    new_data = Comment(content=a["content"],jpost_id=a["jpost_id"], student_email=a["student_email"])
    local_session.add(new_data)
    local_session.commit()


8. also for the filter hashtag billy updated in our wechat group,
could you add them to the hashtag table ?


+ 9. given profile id, change profile stauts: private-> public or public -> private

user = local_session.query(Profile).filter(Profile.id == 1).first()
user.public = 1 or 0 depend on if you want it to be public or private
local_session.commit()

+ 10. given a student email and retrieve all his post

job_post = local_session.query(JobPost).filter(JobPost.student_email == "yl7002@nyu.edu").all()

general_post = local_session.query(GeneralPost).filter(GeneralPost.student_email == "yl7002@nyu.edu").all()

11. given post_id, view all applicants of a job
#like you mean student email? I will return student email and if you want something else
please tell me

students = local_session.query(Application).filter(Application.post_id == 2).all()

+ 12. given post id and post_id, change application status

    user = local_session.query(Application).filter(Application.id == 1).first()
    user.status = "Pending"
    local_session.commit()

+ 13. given a job post id, delete that from table
    user_to_delete = local_session.query(JobPost).filter(JobPost.id == 2).first()
    local_session.delete(user_to_delete)
    local_session.commit()

+ 14. given comment id, increase the like number by one

    comment = local_session.query(Comment).filter(Comment.id == 1).first()
    comment.Likes += 1
    local_session.commit()

You can test if these are correct by using local_session and then i can directly copy post them to app.py.
"""

'''
// POST PAGE
+ 15. create job post,
btw is the Datetime column refers to the time when the date is written into the database?

-Yes Datetime column is the time when the post is posted

jobpost=[
{
    "company_name" : "tiktok",
    "is_Company" : True,
    "company_email" : "tiktok@gmail.com",
    "job_description" : "database engineer",
    "job_requirements" : "database major",
    "job_start_date" : "2022-05-01",
    "apply_end_date" : "2022-06-29",
    "estimate_salary" : 50000,
    "post_title" : "Tiktok database engineer"
    }
]

for j in jobpost:
    new_jobpost = JobPost(company_name=j["company_name"],is_Company=j["is_Company"],company_email=j["company_email"],
job_description=j["job_description"],job_requirements=j["job_requirements"],job_start_date=j["job_start_date"] \
,apply_end_date=j["apply_end_date"],estimate_salary=j["estimate_salary"],post_title=j["post_title"])
    local_session.add(new_jobpost)
    local_session.commit()


+ 16. given jobpost id. Update a job post: e.g. update the end date column

    user = local_session.query(JobPost).filter(JobPost.id == 3).first()
    print(user)
    user.apply_end_date = "2022-07-01"
    local_session.commit()

// APPLIES
17. given jobpost id and student email, delete their application from the application table

user = local_session.query(JobPost).filter(JobPost.id == 3).first()
user.apply_end_date = "2022-07-01"
local_session.commit()



//PROFILE PAGE
+ 18. get profile
given user-email, get the profile

user = local_session.query(Profile).filter(Profile.email == "anh422@nyu.edu").first()
print(user)

19. update profile
given user-email, update this profile

# I will update maybe project experience first and you just need to change
the variable name if you want to update other things in the profile

user = local_session.query(Profile).filter(Profile.email == "anh422@nyu.edu").first()
user.project_experience = "WiCode, InternSHare Project"
local_session.commit()




+ 20. create profile
given username and all related info, writing the data to the databases

profile=[
{
    "email" : "yl7002@nyu.edu",
    "name" : "YuMeng",
    "CV_id" : 2,
    "project_experience" : "InternSHare",
    "internship_experience" : "Google",
    "education_background" : "NYU Shanghai",
    "awards" : "First Prize Hackathon",
    "activities" : "tutor",
    "skills" : "Java, Python, C++",
    "public" = True
    }
]


for j in profile:
    new_profile = Profile(email=j["email"],name=j["name"],CV_id=j["CV_id"],
project_experience=j["project_experience"],internship_experience=j["internship_experience"],education_background=j["education_background"] \
,awards=j["awards"],activities=j["activities"],skills=j["skills"],public=j["public"])
    local_session.add(new_profile)
    local_session.commit()
'''


'''


//jobpost
+ 21. given student id and job post id, the student apply for the job, 
    set default job status
    
studentemail = local_session.query(Student.email).filter(Student.id == 12).first()
studentemail = studentemail[0]
student = [
    {
        "student_email" : studentemail,
        "post_id" : 6
}
]
for s in student:
    new_apply = Application(student_email=s["student_email"], post_id=s["post_id"])
    local_session.add(new_apply)
    local_session.commit()


+ 22. given comment_id delete a comment

    comment_to_delete = local_session.query(Comment).filter(Comment.id == 10).first()
    local_session.delete(comment_to_delete)
    local_session.commit()

+ 23. given comment_id update a comment
    
    comment_to_update = local_session.query(Comment).filter(Comment.id == 1).first()
    comment_to_update.content = "Change successfully"
    local_session.commit()
//apply
+ 24. given application id, cancel application

cancel_appli = local_session.query(Application).filter(Application.id == 6).first()
local_session.delete(cancel_appli)
local_session.commit()

    
//profie
25. given student email, cv file name, cv file, update their cv
    
cv = local_session.query(CV).filter(Profile.email == 'yl7002@nyu.edu').filter(Profile.CV_id == CV.id).first()
cv.pdf_path = "abc.pdf"
local_session.commit()



26. given student email, get their cv file.

cv = local_session.query(CV.data).filter(Profile.email == 'yl7002@nyu.edu').filter(Profile.CV_id == CV.id).first()
print(cv[0])


'''
'''

query 11:
given a post_id, retrieve all application information from the application table
for students who applied for this job

appli = local_session.query(Application).filter(Application.post_id == 2).filter(Application.student_email == Student.email).all()



27. Given a job post id, retrieve all comment related to that job post, if it is a
student, join the table with company to get company name and color as well:
i.e the returned columns should look like:

result = local_session.query(Comment,Company.color,Company.name).filter(Comment.jpost_id == 5).filter(
Comment.company_email == Company.email).all()



'''


