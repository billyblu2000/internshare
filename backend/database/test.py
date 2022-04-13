from dataclass import *

local_session = sessions()

users = local_session.query(Student).all()
print(users)