

from database.dataclass import *

local_session = sessions()

user_to_delete = local_session.query(JobPost).filter(JobPost.id == 2).first()
local_session.delete(user_to_delete)
local_session.commit()
