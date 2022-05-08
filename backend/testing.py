

from database.dataclass import *

search = "%{}%".format("intern")
posts = local_session.query(JobPost).filter(JobPost.post_title.like(search)).order_by(JobPost.Datetime.desc()).all()
print(posts)