

from database.dataclass import *

data=[
    {
        "content":"heyheyhey",
        "jpost_id":"3",
        "comment_id":"7",
        "root" : "6",
        "student_email":"yl7002@nyu.edu"
    }
]

for a in data:
    new_data = Comment(content=a["content"],jpost_id=a["jpost_id"], comment_id=a["comment_id"], root=a["root"], student_email=a["student_email"])
    local_session.add(new_data)
    local_session.commit()

