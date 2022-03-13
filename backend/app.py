from flask import Flask
import pymongo
import mysql.connector as sql
from google.cloud.sql.connector import connector
from google.cloud import bigquery
import sqlalchemy
import pymysql
import pymysql.cursors
import os
from google.cloud.bigquery.client import Client



# modify
app = Flask(__name__, static_url_path='')
# add
# usually to deploy a SPA needs Nginx or Tomcat etc., for dev env, just use the 404 handler offered by Flask



@app.errorhandler(404)
def index(error):
    return app.send_static_file('index.html')




os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = 'C:\\Users\\nhata\\Downloads\\abc.json'
bq_client = Client()

client = bigquery.Client()

table_id = "central-list-344013.InternSHare.users"

schema = [
    bigquery.SchemaField("full_name", "STRING", mode="REQUIRED"),
    bigquery.SchemaField("ID", "INTEGER", mode="REQUIRED"),
]

table = bigquery.Table(table_id, schema=schema)
table = client.create_table(table)  # Make an API request.
print(
    "Created table {}.{}.{}".format(table.project, table.dataset_id, table.table_id)
)



if __name__ == "__main__":
    app.run("127.0.0.1", 5000)
