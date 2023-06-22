from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Autorise les requêtes cross-origin (CORS)


# Exemple de route pour récupérer les utilisateurs
@app.route('/api/users', methods=['GET'])
def get_users():
    users = [{'id': 1, 'name': 'John'}, {'id': 2, 'name': 'Jane'}]  # Exemple de données
    return jsonify(users)


# Exemple de route pour créer un utilisateur
@app.route('/api/users', methods=['POST'])
def create_user():
    user_data = request.get_json()
    # Effectuer les opérations nécessaires pour créer un nouvel utilisateur
    new_user = {'id': 3, 'name': user_data['name']}  # Exemple de nouvel utilisateur créé
    return jsonify(new_user), 201


# Lancer le serveur Flask
if __name__ == '__main__':
    app.run()