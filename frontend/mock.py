import json

from flask import Flask

app = Flask(__name__, static_url_path='')


@app.route('/api/mypost/get', methods=['GET'])
def a():
    test_json = {
        "result": [
            {
                "Datetime": "2022-04-30",
                "apply_end": "2022-07-01",
                "apply_start": "",
                "color": "#bf3f84",
                "company_email": None,
                "company_name": "google",
                "des": "data science",
                "end_date": "2022-06-01",
                "id": 3,
                "is_company": False,
                "name": "Yumeng Lu",
                "requirement": "data science",
                "salary": None,
                "start_date": "2022-05-01",
                "student_email": "yl7002@nyu.edu",
                "title": "google data science"
            }
        ],
        "status": "ok"
    }
    return json.dumps(test_json)


@app.route('/api/profile/getname')
def c():
    test_json = {
        'status': 'ok',
        'name': 'billy',
        'color': '#aaaaaa'
    }
    return json.dumps(test_json)


@app.route('/api/mypost/viewall', methods=['POST'])
def b():
    test_json = {
        "result": [
            {
                "create_time": "2022-05-05",
                "id": 6,
                "is_online": None,
                "major": "Computer Science",
                "name": "Melissa Xu",
                "post_id": 3,
                "status": "Pending",
                "student_email": "mx648@nyu.edu",
                "year": "2023"
            }
        ],
        "status": "ok"
    }
    return json.dumps(test_json)


@app.route('/api/job/getpostcomment', methods=["POST", "GET"])
def d():
    test_json = {
        "status": 'ok',
        "comment": [
            {
                "color": "#bf3f84",
                "company_email": None,
                "company_name": "",
                "content": "Change successfully Change successfully Change successfully Change successfully Change successfully Change successfully Change successfully Change successfully Change successfully",
                "datetime": "2022-02-02",
                "descendent": [],
                "id": 1,
                "job_post_id": 3,
                "like": 0,
                "student_email": "yl7002@nyu.edu",
                "name": "Yumeng Lu",
            }
        ]
    }
    return json.dumps(test_json)

@app.errorhandler(404)
def index(error):
    return app.send_static_file('index.html')

if __name__ == '__main__':
    app.run()
