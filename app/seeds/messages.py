from app.models import Message, db, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_messages():
    message1 = Message(
        channel_id = 1,
        user_id = 1,
        server_id = 1,
        message="wassup girls",
        img="https://imgs.search.brave.com/b7MiiBoqJbjmNv6oTSfZhT2_CsL6MHR-myoARI36WEM/rs:fit:423:236:1/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvZW4vYS9hZi9H/b3NzaXBfR2lybF9B/Y2FwdWxjb190aXRs/ZV9jYXJkLmpwZw",
        created_at=datetime.utcnow()
    )

    message2 = Message(
        channel_id = 1,
        user_id = 2,
        server_id = 1,
        message="omg yasssssss",
        created_at=datetime.utcnow()
    )

    message3 = Message(
        channel_id = 1,
        user_id = 3,
        server_id = 1,
        message="shes serving rn fr",
        created_at=datetime.utcnow()
    )

    message4= Message(
        channel_id = 2,
        user_id = 1,
        server_id = 1,
        message="im just here for a GOOD TIME!",
        created_at=datetime.utcnow()
    )

    message5= Message(
        channel_id = 1,
        user_id = 1,
        server_id = 2,
        message="i got the tea",
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