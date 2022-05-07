

from database.dataclass import *

cancel_appli = local_session.query(Application).filter(Application.id == 6).first()
local_session.delete(cancel_appli)
local_session.commit()

