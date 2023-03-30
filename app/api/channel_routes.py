from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Channel, Server, db, Message
from ..forms.channel_form import ChannelForm

channel_routes = Blueprint('channels', __name__)


# @channel_routes.route('/<int:serverId>/channels')
# # @login_required
# def get_channels(serverId):
#     channels = Channel.query.filter(Channel.server_id == serverId).all()
#     return {'channels': [channel.to_dict() for channel in channels]}

# @channel_routes.route("/<int:serverId>/channels")
# def get_all_channels(serverId):
#   channels = Channel.query.filter(Channel.server_id == serverId)
#   return {'channels': [channel.to_dict() for channel in channels]}

@channel_routes.route("/<int:serverId>/channels", methods=["GET"])
def get_all_channels(serverId):
  channels = Channel.query.filter(Channel.server_id == serverId)
  return {'channels': [channel.to_dict() for channel in channels]}

@channel_routes.route('<int:serverId>/<int:channelId>')
def getChannelById(serverId, channelId):
    '''
    get channel by their channelId
    '''
    channel = Channel.query.get(channelId)
    return jsonify(channel.to_dict())



@channel_routes.route("/<int:serverId>/<int:channelId>", methods=['PUT'])

def edit_channel(serverId, channelId):
  server = Server.query.get(serverId)
  channel = Channel.query.get(channelId)
  form = ChannelForm()

  channel.name = form.data['name']
  db.session.commit()
  return jsonify(channel.to_dict())


@channel_routes.route("/<int:serverId>/<int:channelId>", methods=["DELETE"])
def delete_channel(serverId, channelId):
    """
    Delete channel
    """
    channel = Channel.query.get(channelId)
    server = Server.query.get(serverId)
    if (current_user.id != server.owner_id):
        return {
            "message": "Cannot delete a channel in a server you don't own"
        }
    else:
        db.session.delete(channel)
        db.session.commit()
        return "Channel deleted!"


@channel_routes.route('/<int:channelId>/messages', methods=['GET'])
# @login_required
def get_channel_messages(channelId):
  messages = Message.query.filter(Message.channel_id==channelId)
  return {'messages': [message.to_dict() for message in messages]}