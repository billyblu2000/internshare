from flask import Flask

app = Flask(__name__, static_url_path='')

@app.errorhandler(404)
def index(error):
    return app.send_static_file('index.html')

app.run(host='127.0.0.1', port=5000)