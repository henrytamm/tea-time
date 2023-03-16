from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Message

class MessageForm(FlaskForm):
    message = StringField('Message')
    img = StringField('Image"')