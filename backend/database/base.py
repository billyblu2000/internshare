from dataclass import Base, engine

Base.metadata.create_all(bind=engine)




