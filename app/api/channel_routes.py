from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Channel
from ..forms.channel_form import ChannelForm

channel_routes = Blueprint('channels', __name__)


# @channel_routes.route('/<int:serverId>/channels')
# # @login_required
# def get_channels(serverId):
#     channels = Channel.query.filter(Channel.server_id == serverId).all()
#     return {'channels': [channel.to_dict() for channel in channels]}

@channel_routes.route("/<int:serverId>/channels")
def get_all_channels(serverId):
  channels = Channel.query.filter(Channel.server_id == serverId)
  return {'channels': [channel.to_dict() for channel in channels]}
