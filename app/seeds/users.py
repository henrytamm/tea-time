from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        id=1,
        username='Demo', 
        email='demo@aa.io', 
        password='password', 
        profile_img="https://emoji.discadia.com/emojis/3330c367-64c8-4149-a93c-85ec125ffc5b.gif"
        )
    
    henry = User(
        id= 2,
        username='henry', 
        email='henry@aa.io', 
        password='password', 
        profile_img="https://emoji.discadia.com/emojis/9c8f3ce5-1530-4f03-b138-88ae1f5ec881.PNG"
    )
    
    anthony = User(
        id = 3, 
        username='Anthony', 
        email='anthony@aa.io', 
        password='password', 
        profile_img="https://i.imgflip.com/502xol.jpg"
    )

    alex = User(
        id = 4, 
        username='Alex', 
        email='alex@aa.io', 
        password='password', 
        profile_img="https://i.imgur.com/X6q7UPN.jpg"
    )

    minh = User(
        id = 5, 
        username='Minh', 
        email='minh@aa.io', 
        password='password', 
        profile_img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTr417m6PlE-4Mb1ujFebl__vQUqW7F8_mHnWF8tMDs-w&usqp=CAU&ec=48665699"
    )

    rachel = User(
        id = 6, 
        username='Rachel', 
        email='rachel@aa.io', 
        password='password', 
        profile_img="https://ca.slack-edge.com/T03GU501J-U03DSQYR202-50654b162f22-512"
    )

    yuan = User(
        id = 7, 
        username='Yuan', 
        email='yuan@aa.io', 
        password='password', 
        profile_img="https://i.imgur.com/62inBOd.jpg"
    )
    
    heidi = User(
        id = 8,
        username='Heidi',
        email='heidi@aa.io',
        password='password',
        profile_img="https://i.imgur.com/nvmZ74l.jpg"
    )

    yake = User(
        id = 9,
        username='Yake',
        email='yake@aa.io',
        password='password',
        profile_img="https://i.imgur.com/ajeLPYL.png"
    )

    gabe = User(
        id = 10,
        username='Gabe',
        email='gabe@aa.io',
        password='password',
        profile_img="https://i.imgur.com/PH81BFg.jpg"
    )

    db.session.add(demo)
    db.session.add(henry)
    db.session.add(anthony)
    db.session.add(alex)
    db.session.add(minh)
    db.session.add(rachel)
    db.session.add(yuan)
    db.session.add(heidi)
    db.session.add(yake)
    db.session.add(gabe)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))
        
    db.session.commit()