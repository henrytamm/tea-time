from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import Message, Channel, db
from ..forms.message import MessageForm

message_routes = Blueprint('messages', __name__)


# @message_routes.route('/<int:serverId>/<int:channelId>')
# # @login_required
# def get_all_messages(serverId, channelId):
#     """
#     Query for all messages in a channel
#     """
#     messages = Message.query.filter_by(
#         server_id=serverId, channel_id=channelId)
#     return {"messages": [message.to_dict() for message in messages]}


@message_routes.route('/<int:channelId>/new', methods=['POST'])
@login_required
def create_message(channelId):
    form = MessageForm()

    message = Message(
        user_id=current_user.id,
        channel_id=channelId,
        message=form.data['message']
    )
    db.session.add(message)
    db.session.commit()
    return jsonify(message.to_dict())

@message_routes.route('/<int:messageId>', methods=['PUT'])
@login_required
def edit_channel_message(messageId):
  message = Message.query.get(messageId)
  form = MessageForm()

  if current_user.id == message.user_id:
    message.message = form.data["message"]
    db.session.commit()
    return jsonify(message.to_dict())