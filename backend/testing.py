

from database.dataclass import *

id=5

local_session.execute(text("DELETE FROM applications WHERE id = {}".format(id)))