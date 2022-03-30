from flask import Flask
from database.dataclass import *

local_session=session()

app = Flask(__name__, static_url_path='')

@app.errorhandler(404)
def index(error):
    return app.send_static_file('index.html')


if __name__ == "__main__":
    app.run("127.0.0.1", 5000)

