from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User, Server, ServerMember

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()


# @user_routes.route('/servers')
# # @login_required
# def user_servers():
#     """
#     Query for servers that a user is in/belongs to
#     """
#     server_list = []
#     dict = {}
#     servers = Server.query.all()

#     for server in servers:
#         users = server.user

#         for user in users:
#             if user.id == current_user.id:
#                 server_list.append(server)

#     for server in server_list:
#         dict[f'{server.id}'] = server.to_dict()

#     return dict

@user_routes.route('/<int:id>/servers')
# @login_required
def user_servers(id):
   servers = Server.query.join(ServerMember).filter(ServerMember.user_id == current_user.id).all()
   return jsonify([server.to_dict() for server in servers])