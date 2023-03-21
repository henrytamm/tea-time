from app.models import Server, db, environment, SCHEMA, User
from sqlalchemy.sql import text

def seed_servers():
    gossip_girls = Server (
        name="Gossip Girls",
        server_img="https://imgs.search.brave.com/WpXXhLg5kTkTbkY0xrTqPNqz3HETaKaxucpmqmpsQtg/rs:fit:1200:1200:1/g:ce/aHR0cDovLzMuYnAu/YmxvZ3Nwb3QuY29t/Ly1XWDMtS3dCY0ps/VS9VTTVERHhGVkFh/SS9BQUFBQUFBQ0pq/WS8ycmU3RV9WODJS/cy9zMTYwMC9nb3Nz/aXBfZ2lybF9wb3N0/ZXI2My5qcGc",
        owner_id=1
    )

    tea_time = Server (
        name="Tea Time",
        server_img="https://imgs.search.brave.com/WLytVuuuWZTBsOa6MzilBdH_opbyV_MFQ_myj4cAWwo/rs:fit:641:225:1/g:ce/aHR0cHM6Ly90c2Uz/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC55/TnhUQ05EUHNYVjU2/dkRXNmRHbjdnSGFG/ZSZwaWQ9QXBp",
        owner_id=2
    )

    last_straw = Server (
        name= "Last Straw",
        server_img="https://imgs.search.brave.com/Dtxff8JgqvU1OADohatsm3phQi_OTguvMVxq6e77JQ0/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly9saDQu/Z29vZ2xldXNlcmNv/bnRlbnQuY29tLy14/b01lbE9JdnVpay9U/WFpVcXdSV1UtSS9B/QUFBQUFBQUJLUS8w/RG1DVkxWM0pBVS9z/MTYwMC9OZW9uLUZs/ZXhpYmxlLURyaW5r/aW5nLVN0cmF3Lmpw/Zw",
        owner_id=1
    )

    app_academy = Server (
        name = "App Academy",
        server_img="https://imgs.search.brave.com/20XT-Z0Erqce1n4VplBvd4qVL6uXiemxZ2ZEaDrNHqw/rs:fit:474:225:1/g:ce/aHR0cHM6Ly90c2U0/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5o/V3ptUlcteWM3dUdG/VG05THJEeXJBSGFI/YSZwaWQ9QXBp",
        owner_id=3
    )

    therapy_session = Server (
        name = "Therapy",
        server_img="https://imgs.search.brave.com/0A5nGgXsuB5wTPYMDb412cqjvT6JS8qbng1q0jxxeXg/rs:fit:350:350:1/g:ce/aHR0cHM6Ly9pLmlt/Z2ZsaXAuY29tL3I5/c295LmpwZw",
        owner_id=1
    )

    db.session.add(gossip_girls)
    db.session.add(tea_time)
    db.session.add(last_straw)
    db.session.add(app_academy)
    db.session.add(therapy_session)

    
    db.session.commit()

def undo_servers():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.servers RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM servers"))
        
    db.session.commit()
