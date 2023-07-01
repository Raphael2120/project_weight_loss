# Créez le modèle de données pour l'utilisateur
from flask import jsonify
from flask_cors import CORS
from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import text

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://raman:raman@localhost/calorie_cruncher'
db = SQLAlchemy(app)
CORS(app)  # Autorise les requêtes cross-origin (CORS)


class User(db.Model):
    __tablename__ = 'users'

    id_user = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(25), nullable=True)
    password = db.Column(db.String(16), nullable=True)

    def __init__(self, email, password):
        self.email = email
        self.password = password
