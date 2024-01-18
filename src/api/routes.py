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
    if email != "test" or password != "test":       # aca estoy simulando que le paso estos valores y comparo con la base de datos si estan o no
        return jsonify({"msg": "Bad username or password"}), 401

    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token)