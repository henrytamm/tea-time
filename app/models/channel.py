from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func

class Channel(db.Model):
    __tablename__ = 'channels'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    server_id = db.Column(db.Integer)
    name = db.Column(db.String, nullable=False)


    def to_dict(self):
        return {
            'id': self.id,
            'serverId': self.server_id,
            'name': self.name,
        }