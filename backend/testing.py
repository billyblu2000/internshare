

from database.dataclass import *

appli = local_session.query(Application).filter(Application.post_id == 6).filter(Application.student_email == Student.email).all()
print(appli)

