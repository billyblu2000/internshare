

from database.dataclass import *

local_session = sessions()

profile=[
{
    "email" : "yl7002@nyu.edu",
    "name" : "YuMeng",
    "CV_id" : 2,
    "project_experience" : "InternSHare",
    "internship_experience" : "Google",
    "education_background" : "NYU Shanghai",
    "awards" : "First Prize Hackathon",
    "activities" : "tutor",
    "skills" : "Java, Python, C++",
    "public" : True
    }
]


for j in profile:
    new_profile = Profile(email=j["email"],name=j["name"],CV_id=j["CV_id"],
project_experience=j["project_experience"],internship_experience=j["internship_experience"],education_background=j["education_background"] \
,awards=j["awards"],activities=j["activities"],skills=j["skills"],public=j["public"])
    local_session.add(new_profile)
    local_session.commit()