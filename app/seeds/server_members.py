from app.models import db, ServerMember, environment, SCHEMA
from sqlalchemy.sql import text


def seed_server_members():
    demo1 = ServerMember(
        user_id=1,
        server_id=2,
    )
    demo2 = ServerMember(
        user_id=1,
        server_id=2,
    )
    demo3 = ServerMember(
        user_id=2,
        server_id=1,
    )
    demo4 = ServerMember(
        user_id=2,
        server_id=3,
    )
    demo5 = ServerMember(
        user_id=3,
        server_id=4,
    )
    demo6 = ServerMember(
        user_id=3,
        server_id=1,
    )

    db.session.add(demo1)
    db.session.add(demo2)
    db.session.add(demo3)
    db.session.add(demo4)
    db.session.add(demo5)
    db.session.add(demo6)
    db.session.commit()

def undo_server_members():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.server_members RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM server_members"))
        
    db.session.commit()