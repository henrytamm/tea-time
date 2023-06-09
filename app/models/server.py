from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func

class Server(db.Model):
    __tablename__ = 'servers'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    server_img = db.Column(db.String)
    
    channel = db.relationship("Channel", back_populates="server", cascade="all, delete")
    user = db.relationship("User", back_populates="server")
    # message = db.relationship("Message", back_populates='server', cascade="all, delete")
    server_member = db.relationship("ServerMember", back_populates='server', cascade="all, delete")


    def to_dict(self):
        return {
            'id': self.id,
            'ownerId': self.owner_id,
            'name': self.name,
            'serverImg': self.server_img,
            'channels': [channel.to_dict() for channel in self.channel],
            'members': [member.to_dict() for member in self.server_member]
        }
