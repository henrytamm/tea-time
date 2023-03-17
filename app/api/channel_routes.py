from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Channel
from ..forms.channel_form import ChannelForm

channel_routes = Blueprint('channels', __name__)


@channel_routes.route('/')
# @login_required
def get_all_channels_in_server():
    """
    Query for all channels in a server
    """
    channels = Channel.query.all()
    return {'channels': [channel.to_dict() for channel in channels]}


@channel_routes.route('/<int:id>')
# @login_required
def get_one_channel_by_id(id):
    """
    Query for one channel by id
    """
    channel = Channel.query.get(id)
    return channel.to_dict()



