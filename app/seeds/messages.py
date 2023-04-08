from app.models import Message, db, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_messages():
    message1 = Message(
        channel_id = 8,
        user_id = 1,
        message="AHHHHHH",
        created_at=datetime.utcnow()
    )

    message2 = Message(
        channel_id = 8,
        user_id = 2,
        message="everythings broken idk",
        created_at=datetime.utcnow()
    )

    message3 = Message(
        channel_id = 8,
        user_id = 3,
        message="im already done",
        created_at=datetime.utcnow()
    )

    message4= Message(
        channel_id = 8,
        user_id = 4,
        message="im unwell",
        created_at=datetime.utcnow()
    )

    message5= Message(
        channel_id = 8,
        user_id = 5,
        message="im hungover",
        created_at=datetime.utcnow()
    )

    message6= Message(
        channel_id = 9,
        user_id = 1,
        message="im snitching",
        created_at=datetime.utcnow()
    )

    message7= Message(
        channel_id = 8,
        user_id = 6,
        message="wait, am I the only one using express?",
        created_at=datetime.utcnow()
    )

    message8= Message(
        channel_id = 8,
        user_id = 7,
        message="i hate filing my taxes",
        created_at=datetime.utcnow()
    )

    message9= Message(
        channel_id = 8,
        user_id = 8,
        message="my puppy has all my attention right now!",
        created_at=datetime.utcnow()
    )

    db.session.add(message1)
    db.session.add(message2)
    db.session.add(message3)
    db.session.add(message4)
    db.session.add(message5)
    db.session.add(message6)
    db.session.add(message7)
    db.session.add(message8)
    db.session.add(message9)
    db.session.commit()

def undo_messages():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.messages RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM messages"))
        
    db.session.commit()