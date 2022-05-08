

from database.dataclass import *

search = "%{}%".format("sale")
posts = local_session.query(JobPost).filter(JobPost.post_title.like(search)).all()

