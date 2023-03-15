from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func

class Server(db.Model):
    __tablename__ = 'servers'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    owner_id = db.Column(db.Integer)
    server_img = db.Column(db.String)


    def to_dict(self):
        return {
            'id': self.id,
            'ownerId': self.owner_id,
            'name': self.name,
            'serverImg': self.server_img,
        }