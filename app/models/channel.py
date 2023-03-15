from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func

class Channel(db.Model):
    __tablename__ = 'channels'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    server_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('servers.id')), nullable=False)
    name = db.Column(db.String, nullable=False)

    server = db.relationship("Server", back_populates='channel')
    message = db.relationship("Message", back_populates="channel", cascade='all, delete')


    def to_dict(self):
        return {
            'id': self.id,
            'serverId': self.server_id,
            'name': self.name,
        }