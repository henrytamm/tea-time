from app.models import Message, db, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_messages():
    message1 = Message(
        channel_id = 1,
        user_id = 1,
        message="bork bork",
        created_at=datetime.utcnow()
    )

    message2 = Message(
        channel_id = 1,
        user_id = 2,
        message="arf bork",
        created_at=datetime.utcnow()
    )

    message3 = Message(
        channel_id = 1,
        user_id = 3,
        message="woof",
        created_at=datetime.utcnow()
    )

    message4= Message(
        channel_id = 2,
        user_id = 1,
        message="woof woof",
        created_at=datetime.utcnow()
    )

    message5= Message(
        channel_id = 1,
        user_id = 1,
        message="bark",
        created_at=datetime.utcnow()
    )

    db.session.add(message1)
    db.session.add(message2)
    db.session.add(message3)
    db.session.add(message4)
    db.session.add(message5)
    db.session.commit()

def undo_messages():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.messages RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM messages"))
        
    db.session.commit()