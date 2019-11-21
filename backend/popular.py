from api import Usuario, db

admin = Usuario(login="admin", senha="admin", is_admin=True)
db.session.add(admin)
db.session.commit()

