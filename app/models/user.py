from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    profile_img = db.Column(db.String)
    hashed_password = db.Column(db.String(255), nullable=False)

    message = db.relationship("Message", back_populates="user", cascade="all, delete")
    server = db.relationship("Server", cascade="all, delete", back_populates="user")
    server_member = db.relationship("ServerMember", back_populates="user", cascade="all, delete")
   

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'profileImg': self.profile_img,
        }
