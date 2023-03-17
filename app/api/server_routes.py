from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Server
from ..forms.server_form import ServerForm

server_routes = Blueprint('servers', __name__)


@server_routes.route('/')
# @login_required
def get_all_servers():
    """
    Query for all servers
    """
    servers = Server.query.all()
    return {'servers': [server.to_dict() for server in servers]}


@server_routes.route('/<int:serverId>')
# @login_required
def get_one_server(serverId):
    """
    Query for one server by id
    """
    server = Server.query.get(serverId)
    return server.to_dict()