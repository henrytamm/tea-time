from app.models import Server, db, environment, SCHEMA, User
from sqlalchemy.sql import text

def seed_servers():

    may_cohort = Server (
        name="App Academy May 2022 Cohort",
        server_img='https://i.imgur.com/4M34hi2.png',
        owner_id=2
    )
    gossip_girls = Server (
        name="Gossip Girls",
        server_img="https://i.imgur.com/QkIa5tT.jpeg",
        owner_id=1
    )

    tea_time = Server (
        name="Tea Time",
        server_img="https://i.imgur.com/7lCbMJb.png",
        owner_id=2
    )

    yake = Server (
        name= "Pouring one out for Yake",
        server_img='https://i.imgur.com/PH81BFg.jpg',
        owner_id=1
    )

    app_academy = Server (
        name = "App Academy",
        server_img="https://i.imgur.com/4M34hi2.png",
        owner_id=3
    )

    therapy_session = Server (
        name = "Therapy",
        server_img="https://i.imgur.com/r9soy.jpeg",
        owner_id=1
    )

    db.session.add(may_cohort)
    db.session.add(gossip_girls)
    db.session.add(tea_time)
    db.session.add(yake)
    db.session.add(app_academy)
    db.session.add(therapy_session)


    db.session.commit()

def undo_servers():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.servers RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM servers"))

    db.session.commit()
