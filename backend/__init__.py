from flask import Flask, render_template, request, session
app = Flask(__name__, static_url_path='')
from flask_mail import Mail, Message
import os
# session config
app.config["SESSION_PERMANENT"] = False
app.secret_key = "any random string"

mail = Mail(app)
# mail config
app.config['MAIL_SERVER']='smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = os.getenv("NAME")
app.config['DEFAULT_SENDER'] = os.getenv("NAME")
app.config['MAIL_PASSWORD'] = os.getenv("PASSWORD")


app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True
mail = Mail(app)
