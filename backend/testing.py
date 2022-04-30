

from database.dataclass import *

local_session = sessions()

job_post = local_session.query(JobPost).filter(JobPost.student_email == "yl7002@nyu.edu").all()

general_post = local_session.query(GeneralPost).filter(GeneralPost.student_email == "yl7002@nyu.edu").all()

print(job_post)
print(general_post)

