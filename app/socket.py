from flask_socketio import SocketIO, emit, join_room, leave_room
import os


# configure cors_allowed_origins
if os.environ.get('FLASK_ENV') == 'production':
    origins = [
        'https://tea-time-ayc5.onrender.com',
        'http://tea-time-ayc5.onrender.com',
    ]
else:
    origins = "*"

# initialize your socket instance
socketio = SocketIO(cors_allowed_origins=origins, logger=True, engineio_logger=True)

# handle chat messages
@socketio.on("message")
def send_message(data):
    emit("message", data, room=data['room'])

@socketio.on("join_room")
def on_join(data):
    room = data['room']
    join_room(room)
    emit("join_room", data, broadcast=True)

@socketio.on("leave_room")
def on_leave(data):
    leave_room(data["room"])

@socketio.on("edit_message")
def handle_edit_message(data):
    emit("edit_message", data, room=data['room'])