from dataclass import *

local_session = session()

users = local_session.query(Profile).all()
print(users[0])