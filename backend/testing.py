

from database.dataclass import *

local_session.execute(text(
    "INSERT INTO comments(content,jpost_id,comment_id,root,student_email,Likes) VALUES('{}',{},{},{},'{}',0)".format(
        'hahaha', 4, 'NULL', 'NULL', 'yl7002@nyu.edu')))