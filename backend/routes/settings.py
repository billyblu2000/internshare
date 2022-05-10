from flask import Blueprint,request
import json

setting = Blueprint('setting', __name__)


@setting.route("/password",methods = ["GET","POST"])
def change_password():
    content = request.get_json()
    return json.dumps({"status":"ok"})
    return json.dumps({"status":"fail"})