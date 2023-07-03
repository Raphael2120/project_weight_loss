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
            imc_range = row[-1]  # Assuming the IMC_range is the last column in the result row
            id_program = row[0]
            name_program = row[1]
            type_program = row[2]
            desc_program = row[3]
            goal = row[4]
            duration = row[5]

            print(imc_range)
            print(name_program)

            imc_range = imc_range.replace(" ", "").split("-")
            imc_range = [float(value) for value in imc_range]

            if imc_range[0] <= imc_input <= imc_range[1]:
                response = {
                    'alert': 'success',
                    'message': 'IMC within range',
                    'imc_range': imc_range,
                    'id_program': id_program,
                    'name_program': name_program,
                    'type_program': type_program,
                    'desc_program': desc_program,
                    'goal': goal,
                    'duration': duration,
                    'imc_value': imc_input,
                    'redirectURL': url_for('best_recipes_route')
                    # Replace 'best_recipes_route' with the actual name of your route for Best Recipes
                }
                print(imc_range)
                print(name_program)
                return jsonify(response)

        # Si l'IMC n'est pas dans la plage des valeurs récupérées, renvoyer un message spécifique
        return jsonify({'alert': 'warning', 'message': 'IMC not within range'})

    except Exception as e:
        print(e)  # Afficher l'erreur dans la console Flask
        return jsonify({'alert': 'error', 'error': str(e)}), 500


@app.route('/best-recipes', methods=['POST'])
def best_recipes_route():
    # Code pour gérer la page des meilleures recettes
    # ...

    # Retourner la réponse JSON avec l'URL de la page best-recipes
    return jsonify({'redirectURL': '/best-recipes'}), 200


# Lancer le serveur Flask
if __name__ == '__main__':
    app.run()
