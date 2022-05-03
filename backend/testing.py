

from database.dataclass import *

local_session = sessions()

result = local_session.query(Comment,Student.name,Student.color).filter(Comment.jpost_id == 3).filter(
Comment.student_email == Student.email).all()

print(result)