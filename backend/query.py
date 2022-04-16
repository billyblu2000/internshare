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


4. search_particular_post
given:
variable name: filter (which is the content the user entered in the search box)
return:
all job posts that are related to the content and each should contain all job's info
as well as all general posts info related to the content

5. check_status
varaible name: email
given student email and check that student's job application status,
only given back the job post id and status
"""
