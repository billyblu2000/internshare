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

generalposts = local_session.query(generalPosts).order_by(generalPosts.Datetime.desc()).all()

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

#query to return the content of post

post = local_session.query(jobPosts).all()
content_list = []
for i in post:
content_list.append(post[i].job_description)

#same with the general post
post = local_session.query(generalPosts).all()
content_list = []
for i in post:
content_list.append(post[i].content)

5. check_status
variable name: email
given student email and check that student's job application status,
only given back the job post id and status

result = local_session.query(applications).filter(applications.student_email == email).all()
jobpostid_list = []
status = []
or maybe do like a dictionary with jobpost id as key and status as value

result[i].post_id #return the post_id
result[i].status #return the status

"""
