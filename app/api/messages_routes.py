from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Message
from ..forms.message import MessageForm

message_routes = Blueprint('messages', __name__)


@message_routes.route('/<int:channelId>')
@login_required
def get_all_messages(channel_id):
    """
    Query for all messages in a channel
    """
    messages = Message.query.filter(Message.channel_id==channel_id).all()
    return {'messages': [message.to_dict() for message in messages]}


@message_routes.route('/<int:id>')
@login_required
def get_one_server_by_id():
    """
    Query for one message in a channel
    """
    messages = Message.query.get(id)
    return messages.to_dict()