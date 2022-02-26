from flask import Flask
# modify
app = Flask(__name__, static_url_path='')
# add
# usually to deploy a SPA needs Nginx or Tomcat etc., for dev env, just use the 404 handler offered by Flask

@app.errorhandler(404)
def index(error):
    return app.send_static_file('index.html')

if __name__ =="__main__":
    app.run()