from app.models import Server, db, environment, SCHEMA, User
from sqlalchemy.sql import text

def seed_servers():

    may_cohort = Server (
        name="App Academy May 2022 Cohort",
        server_img='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDAOadBLnEEEoNEuw1XIGqsFra6FlPNNOuAw&usqp=CAU',
        owner_id=2
    )
    gossip_girls = Server (
        name="Gossip Girls",
        server_img="https://imgs.search.brave.com/FDIGQN45eN0Hrme3_HaoVsN81q0RNWFqpY8buGeXxMU/rs:fit:841:225:1/g:ce/aHR0cHM6Ly90c2Uy/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5B/Ujd3YnZzLU9fTERv/SklCQk41UVNRSGFF/TCZwaWQ9QXBp",
        owner_id=1
    )

    tea_time = Server (
        name="Tea Time",
        server_img="https://imgs.search.brave.com/gCiJ0ClK0knQnCY6KJXa5Y4sExkMwY4cAPYRFRIr_ZI/rs:fit:474:225:1/g:ce/aHR0cHM6Ly90c2Uz/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5I/OU44Qm5vcnptMFNZ/Y1l2YVdvQUR3SGFI/YSZwaWQ9QXBp",
        owner_id=2
    )

    yake = Server (
        name= "Pouring one out for Yake",
        server_img='https://imgs.search.brave.com/XdAGBra5Gg1Jtbn9ZdZgaPuzHZ6YlUVlBE-7VTES-IY/rs:fit:128:225:1/g:ce/aHR0cHM6Ly90c2Uz/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5M/dkZmSUFjTDB2V29v/OGFvWElzVTh3QUFB/QSZwaWQ9QXBp',
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
