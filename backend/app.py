from flask import Flask
from google.cloud import bigquery
import os


app = Flask(__name__, static_url_path='')


@app.errorhandler(404)
def index(error):
    return app.send_static_file('index.html')


os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = os.path.dirname(os.path.realpath(__file__)) + '/key.json'

client = bigquery.Client()

table_id = "central-list-344013.InternSHare.users"

schema = [
    bigquery.SchemaField("full_name", "STRING", mode="REQUIRED"),
    bigquery.SchemaField("ID", "INTEGER", mode="REQUIRED"),
]

table = bigquery.Table(table_id, schema=schema)
table = client.create_table(table)  # Make an API request.
print(
    "Created table {}.{}.{}".format(
        table.project, table.dataset_id, table.table_id)
)


if __name__ == "__main__":
    app.run("127.0.0.1", 5000)
