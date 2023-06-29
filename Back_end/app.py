from flask import Flask, jsonify, request
from flask_cors import CORS
from flask import Flask, render_template, request, redirect


app = Flask(__name__)
CORS(app)  # Autorise les requêtes cross-origin (CORS)


# Exemple de route pour récupérer les utilisateurs
@app.route('/api/users', methods=['GET'])
def get_users():
    users = [{'id': 1, 'name': 'John'}, {'id': 2, 'name': 'Jane'}]  # Exemple de données
    return jsonify(users)

@app.route('/api/create/users', methods=['POST'])
def create_user():
    user_data = request.get_json()
    # Effectuer les opérations nécessaires pour créer un nouvel utilisateur
    new_user = {'id': 3, 'name': user_data['name']}  # Exemple de nouvel utilisateur créé
    return jsonify(new_user), 201


# Exemple de route pour créer un utilisateur
@app.route('/api/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        # Vérifier les informations d'identification de l'utilisateur ici
        username = request.form['username']
        password = request.form['password']

        # Vérifier les informations d'identification de l'utilisateur
        if username == 'utilisateur' and password == 'motdepasse':
            # Login réussi, rediriger vers la page protégée
            return redirect('/page-protegee')
        else:
            # Informations d'identification incorrectes, afficher un message d'erreur
            error_message = 'Informations d\'identification incorrectes. Veuillez réessayer.'
            return render_template('login.html', error_message=error_message)

    # Si la méthode est GET, afficher simplement le formulaire de connexion
    return render_template('login.html')

@app.route('/api/imc', methods=['GET'])
def calculer_imc(poids, taille):
    # Conversion de la taille en mètres
    taille = taille / 100
    # Calcul de l'IMC
    imc = poids / (taille * taille)
    return imc

@app.route('/api/programme', methods=['GET'])
def programme1():
    print("Exécution du programme 1")

def programme2():
    print("Exécution du programme 2")
def proposer_programme(imc):
    if imc < 50:
        programme1()
    else:
        programme2()
    return proposer_programme
@app.route('/api/users', methods=['GET'])
def creer_compte():
    nom_utilisateur = input("Choisissez un nom d'utilisateur : ")
    mot_de_passe = input("Choisissez un mot de passe : ")

    # Création de l'objet Utilisateur
    utilisateur = Utilisateur(nom_utilisateur, mot_de_passe)

    return utilisateur


# Lancer le serveur Flask
if __name__ == '__main__':
    app.run()