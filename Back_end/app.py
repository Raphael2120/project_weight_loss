from flask import jsonify, url_for
from flask import request
from sqlalchemy import text
from User import User, app, db


@app.route('/register-user', methods=['POST'])
def register_user():
    try:
        # Récupérer les données du formulaire d'inscription depuis la requête POST
        email = request.json['email']
        password = request.json['password']

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
        imc_input = float(request.json['imc'])  # Récupérer la valeur de l'IMC depuis la requête POST

        # Exécuter une requête SELECT pour récupérer les valeurs du champ IMC depuis la base de données
        result = db.session.execute(
            text('SELECT id_program, name_program, type_program, desc_program, goal, duration, IMC_range FROM program'))

        imc_values = []
        for row in result:
            imc_range = row[-1]
            imc_range = imc_range.replace(" ", "").split("-")
            imc_range = [float(value) for value in imc_range]

            if imc_range[0] <= imc_input <= imc_range[1]:
                imc_values.append({
                    'id_program': row[0],
                    'name_program': row[1],
                    'type_program': row[2],
                    'desc_program': row[3],
                    'goal': row[4],
                    'duration': row[5],
                    'imc_range': imc_range,
                    'imc_value': imc_input,
                })

        # Return a response with the IMC values
        response = {
            'imc_values': imc_values,
            'imc_input': imc_input,
        }
        return jsonify(response)
    except Exception as e:
        print(e)  # Afficher l'erreur dans la console Flask
        return jsonify({'alert': 'error', 'error': str(e)}), 500


# Lancer le serveur Flask
if __name__ == '__main__':
    app.run()
