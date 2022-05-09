

from database.dataclass import *

id=11

local_session.execute(text("DELETE FROM applications WHERE id = {}".format(id)))