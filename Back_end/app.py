from flask import Flask, jsonify, request
from flask_cors import CORS
from flask import Flask, render_template, request, redirect
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


"""
Ceci est un commentaire
sur plusieurs lignes.
Il peut contenir plusieurs lignes de texte.



# Définir le modèle d'utilisateur
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))

# Exemple de route pour récupérer les utilisateurs depuis la base de données
@app.route('/api/users', methods=['GET'])
def get_users():
    users = User.query.all()
    user_list = [{'id': user.id, 'name': user.name} for user in users]
    return jsonify(user_list)

# Exemple de route pour créer un utilisateur dans la base de données
@app.route('/api/create/users', methods=['POST'])
def create_user():
    user_data = request.get_json()
    new_user = User(name=user_data['name'])
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'User created successfully'})

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
"""

# Lancer le serveur Flask
if __name__ == '__main__':
    app.run()