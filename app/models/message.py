from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func

class Message(db.Model):
    __tablename__ = 'messages'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    channel_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('channels.id')), nullable=False)
    message = db.Column(db.String)
    img_url = db.Column(db.String)
    created_at = db.Column(db.Timestamp(timezone=True), server_default=func.now())
    updated_at = db.Column(db.Timestamp(timezone=True), onupdate=func.now())

    channel = db.relationship('Channel', back_populates='message')
    user = db.relationship('User', back_populates='message')


    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'channelId': self.channel_id,
            'message': self.message,
            'imgUrl': self.img_url,
        }