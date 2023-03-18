from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Message
from ..forms.message import MessageForm

message_routes = Blueprint('messages', __name__)


@message_routes.route('/<int:serverId>/<int:channelId>')
# @login_required
def get_all_messages(serverId, channelId):
    """
    Query for all messages in a channel
    """
    messages = Message.query.filter_by(server_id=serverId, channel_id=channelId)
    return {"messages": [message.to_dict() for message in messages]}