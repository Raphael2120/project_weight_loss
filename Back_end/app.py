from flask import jsonify
from flask_cors import CORS
from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import text

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://raman:raman@localhost/calorie_cruncher'
db = SQLAlchemy(app)
CORS(app)  # Autorise les requêtes cross-origin (CORS)


@app.route('/')
def test_db_connection():
    try:
        result = db.session.execute(text('SELECT * FROM users'))  # Exécute la requête SELECT
        users = [dict(row) for row in result]  # Convertit les résultats en liste de dictionnaires
        return jsonify(users)  # Retourne les utilisateurs au format JSON
    except Exception as e:
        return f'Erreur de connexion à la base de données: {str(e)}'


@app.route('/register-recipe', methods=['POST'])
def register_recipe():
    try:
        email = request.json['email']
        password = request.json['password']

        # Effectuez le traitement nécessaire pour enregistrer la recette dans la base de données
        # ...

        return jsonify({'message': 'User registered successfully with BDD'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    # Retournez une réponse JSON indiquant le succès ou l'échec de l'enregistrement
    # return jsonify({'message': 'Recette enregistrée', 'recipe': recipe, 'author': author})


# Créez le modèle de données pour l'utilisateur
class User(db.Model):
    __tablename__ = 'users'

    id_user = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(25), nullable=True)
    password = db.Column(db.String(16), nullable=True)

    def __init__(self, email, password):
        self.email = email
        self.password = password


@app.route('/register-user', methods=['POST'])
def register_user():
    try:
        # Récupérer les données du formulaire d'inscription depuis la requête POST
        # username = request.json['username']
        # email = request.json['email']
        # password = request.json['password']

        # Récupérez les données du formulaire d'inscription depuis la requête POST
        email = request.json['email']
        password = request.json['password']
        # email = request.json.get('email')
        # password = request.json.get('password')

        # Insérer l'utilisateur dans la base de données
        new_user = User(email=email, password=password)
        db.session.add(new_user)
        db.session.commit()
        response = {
            'message': 'User registered successfully with BDD',
            'user_id': new_user.id_user
        }
        return jsonify(response), 200
    except Exception as e:
        # En cas d'erreur, retourner une réponse JSON avec le message d'erreur
        response = {
            'error': 'Failed to register user',
            'message': str(e)
        }
        return jsonify(response), 500


# Lancer le serveur Flask
if __name__ == '__main__':
    app.run()
