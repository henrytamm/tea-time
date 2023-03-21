from .db import db, environment, SCHEMA, add_prefix_for_prod


class ServerMember(db.Model):
    __tablename__ = "server_members"
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("users.id")), nullable=False)
    server_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("servers.id")), nullable=False)

    user = db.relationship("User", back_populates="server_member")
    server = db.relationship("Server", back_populates="server_member")

    def to_dict(self):
        return {
            "id": self.id,
            "userId": self.user_id,
            "serverId": self.server_id,
        }
