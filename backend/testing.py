

from database.dataclass import *

local_session = sessions()
cancel_appli = local_session.query(Application).filter(Application.id == 6).first()
cancel_appli.status = "Cancel"
local_session.commit()