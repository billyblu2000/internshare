from flask import Blueprint,request,session,render_template
from ..database.dataclass import *
import json

apply = Blueprint('apply', __name__)

# @apply.route('/get_status', methods=["GET", "POST"])
# def get_apply_status():
#     try:
#         content = request.get_json()
#         return json.dumps({"status": "ok"})
#     except:
#         return json.dumps({"status":"fail"})


@apply.route('/cancel', methods=["GET", "POST"])
def cancel():
    try:
        content = request.get_json()
        return json.dumps({"status": "ok"})
    except:
        return json.dumps({"status":"fail"})