from app.models import Channel, db, environment, SCHEMA
from sqlalchemy.sql import text

def seed_channels():
    channel1 = Channel(
        server_id = 2,
        name="general",
    )

    channel2 = Channel(
        server_id = 2,
        name="gossip",
    )

    channel3 = Channel(
        server_id = 2,
        name="spill the tea"
    )

    channel4 = Channel(
        server_id = 2,
        name="party"
    )

    channel5 = Channel(
        server_id = 3,
        name="general"
    )

    channel6 = Channel(
        server_id = 4,
        name="not general"
    )

    channel7 = Channel(
        server_id = 5,
        name="wassup"
    )

    channel8 = Channel(
        server_id = 1,
        name="general"
    )

    channel9 = Channel(
        server_id = 1,
        name="test-answers"
    )

    channel10 = Channel(
        server_id = 4,
        name="general"
    )

    channel11 = Channel(
        server_id = 4,
        name="thanks yake"
    )

    db.session.add(channel1)
    db.session.add(channel2)
    db.session.add(channel3)
    db.session.add(channel4)
    db.session.add(channel5)
    db.session.add(channel6)
    db.session.add(channel7)
    db.session.add(channel8)
    db.session.add(channel9)
    db.session.add(channel10)
    db.session.add(channel11)
    db.session.commit()

def undo_channels():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.channels RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM channels"))
        
    db.session.commit()