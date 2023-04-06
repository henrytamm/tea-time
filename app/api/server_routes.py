from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Server, db, Channel, ServerMember
from ..forms.server_form import ServerForm
from ..forms.channel_form import ChannelForm
from app.aws import upload_file_to_s3, get_unique_filename, allowed_file


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


@server_routes.route("/", methods=["POST"])
# @login_required
def create_server():
    """
    Create a new server with a general channel
    """
    form = ServerForm()
    url = None
    if "image" in request.files:
            image = request.files['image']
            if not allowed_file(image.filename):
                return {"errors": "file type not permitted"}
            image.filename = get_unique_filename(image.filename)
            upload = upload_file_to_s3(image)

            if "url" not in upload:
                return upload, 400
            url = upload["url"]
    
    server = Server(
        name=form.data["name"],
        owner_id=current_user.get_id(),
        server_img=url,
    )

    db.session.add(server)
    db.session.commit()

    channel = Channel(
        server_id=server.id,
        name="general"
    )

    db.session.add(channel)
    db.session.commit()

    member = ServerMember(
        user_id=current_user.get_id(),
        server_id=server.id
    )

    db.session.add(member)
    db.session.commit()

    return jsonify(server.to_dict())


@server_routes.route("/<int:serverId>", methods=['PUT'])
def edit_server(serverId):
    """
    Edit server
    """
    
    server = Server.query.get(serverId)
    form = ServerForm()
    if (current_user.id != server.owner_id):
        return {
            "message": "Cannot edit a server you don't own"
        }
    else:
        url = None
        if "image" in request.files:
            image = request.files['image']
            if not allowed_file(image.filename):
                return {"errors": "file type not permitted"}
            image.filename = get_unique_filename(image.filename)
            upload = upload_file_to_s3(image)

            if "url" not in upload:
                return upload, 400
            url = upload["url"]
        server.name = form.data['name']
        server.server_img = url
        db.session.commit()
        return jsonify(server.to_dict())


@server_routes.route("/<int:serverId>", methods=["DELETE"])
def delete_server(serverId):
    """
    Delete server
    """
    server = Server.query.get(serverId)
    if (current_user.id != server.owner_id):
        return {
            "message": "Cannot delete a server you don't own"
        }
    else:
        db.session.delete(server)
        db.session.commit()
        return "Server deleted!"


@server_routes.route("/<int:serverId>/channels/new", methods=["POST"])
def create_channel(serverId):
    """
    Create a new channel in a server
    """
    form = ChannelForm()
    server = Server.query.get(serverId)
    if (current_user.id != server.owner_id):
        return {
            "message": "Cannot create a channel in a server you don't own"
        }
    else:
        new_channel = Channel(
            server_id=serverId,
            name=form.data["name"]
        )

        db.session.add(new_channel)
        db.session.commit()

        return jsonify(new_channel.to_dict())
    
@server_routes.route('/<int:serverId>/join', methods=['POST'])
@login_required
def join_server(serverId):
    """
    logged in user gets added to server member list
    """
    server = Server.query.get(serverId)
    currServer = Server.query.join(ServerMember).filter(ServerMember.user_id == current_user.id).all()
    member = ServerMember(
        user_id=current_user.id,
        server_id=serverId
    )

    if server in currServer:
        return jsonify({'error': 'User is already a member'}), 400
    
    db.session.add(member)
    db.session.commit()

    return jsonify(server.to_dict())
    
