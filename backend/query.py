"""
from app import User, session,Address

local_session=session()

1。 login
SELECT password FROM user WHERE email = %s

email = %s
user = local_session.query(user).filter(User.email==email).first()

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


3.

"""
