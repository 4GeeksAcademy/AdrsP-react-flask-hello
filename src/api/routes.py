"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

from flask_jwt_extended import create_access_token 
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

# recuerda instalar el Flask-JWT-Extended con el comando $ pipenv install flask-jwt-extended

# Create a route to authenticate your users and return JWTs. The
# create_access_token() function is used to actually generate the JWT.
@api.route("/token", methods=["POST"]) # en postman url = http://wikeddirectionurlapp.githubetc + /api/token, no token solo
def create_token():                     # es decir el url del server del backend
    email = request.json.get("email", None)   #obtengo del fecth el email puede ser username tambien
    password = request.json.get("password", None)   #obtengo del fecth el password
    
    user = User.query.filter_by(email=email, password=password).first() # estoy buscando al usuario en la base de datos si no lo consigue user pasa al if

    if not user:
        return jsonify({"msg": "Bad username or password"}), 401

    access_token = create_access_token(identity=email) # nota al editor aca identity se guarda como la variable email, asi que cuando se llame con un get_jwt_identity tendra ese valor en este caso el del email
    return jsonify(access_token=access_token)

@api.route("/hello", methods=["GET"])
@jwt_required()          #este decorador se aplica para que se exija un token de autorizacion para correr la funcion del endpoint
def get_hello():

    usuario = get_jwt_identity()  # la funcion get_jwt_idendity permite conocer quien creo el token o bueno quien hizo la solicitud para crear el token
    dictionary = {
        "message": "Welcome back " + usuario
    }                     
    return jsonify(dictionary)

@api.route('/user', methods=['GET'])  # por probar le puse esta ruta 
def get_all_users():
    user = User.query.all() # trae una lista de objetos de la tabla user
    results = list(map(lambda usuarios : usuarios.serialize(), user)) # se realiza el mapeo y posterior generacion de la lista con los resultados
    
    return jsonify(results), 200

@api.route("/singup", methods=["POST"]) 
def new_user():
    data = request.json                   # deberia verificar la estructura que me estan pasando o algo asi
    
    email = request.json.get("email", None)          #obtengo del fecth el email puede ser username tambien

    user = User.query.filter_by(email=email).first() #reviso si existe ese email en la lista de usuarios

    if user is None:                          # si no existe pues lo creo
        new_record = User(**data)

        db.session.add(new_record)
        db.session.commit()

        return jsonify({'message': 'User created successfully'}), 201
    
    else:
        return jsonify({'message': 'that user already exist'}), 400

# tengo problemas con este metodo de como pasarle la informacion para que elimine el usuario trate con un jwt identity pero no lo cacha
@api.route('/deleteUser', methods=['DELETE'])
@jwt_required() 
def delete_favorite():
    user_email = "Andres"
    print(user_email) 
    deleted_user = User.query.filter_by(email = user_email)
   
    if deleted_user is None:
        return ({"message": "no existe el usuario"}), 404
    
    db.session.delete(deleted_user)
    db.session.commit()
    return ({"message": "usuario eliminado"}), 200