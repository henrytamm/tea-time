from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Server

class ServerForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])
    server_img = StringField('Server Image')