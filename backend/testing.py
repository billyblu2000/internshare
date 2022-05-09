

from database.dataclass import *





local_session.execute(text("""INSERT INTO cvs(pdf_path) VALUES("new.pdf")"""))
