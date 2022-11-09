from datetime import datetime
from datetime import date
def toDate(string):
    if string == "" or date is None:
        return date.today()
    return (datetime.fromisoformat(string))