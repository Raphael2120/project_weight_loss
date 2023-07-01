from flask import jsonify
from flask_cors import CORS
from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import text
from User import User, app, db

"""@app.route('/')
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

"""


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


@app.route('/get-imc-values', methods=['POST'])
def get_imc_values():
    try:
        # Exécutez une requête SELECT pour récupérer les valeurs du champ IMC
        result = db.session.execute(text('SELECT IMC_range FROM program'))
        imc_values = get_imc_values().json  # Récupérer les valeurs de l'IMC à partir de la route précédente
        imc_input = float(request.json['imc'])  # Récupérer la valeur de l'IMC depuis la requête POST

        # Récupérez les résultats et traitez les valeurs de l'IMC
        imc_values = []
        for row in result:
            imc_value = row[0]
            imc_value = imc_value.replace(" ", "").split("-")
            imc_value = [int(value) for value in imc_value]
            imc_values.append(imc_value)
        # Utiliser les valeurs de l'IMC dans une condition if par exemple
        # Comparer la valeur de l'IMC avec les valeurs récupérées de la base de données
        for imc_range in imc_values:
            if imc_range[0] <= imc_input <= imc_range[1]:
                return jsonify({'message': 'IMC within range', 'imc_range': imc_range})
        return jsonify(imc_values)
    except Exception as e:
        return jsonify({'error': str(e)}), 500


# Lancer le serveur Flask
if __name__ == '__main__':
    app.run()
