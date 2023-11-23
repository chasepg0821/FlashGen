import os
from flask import Blueprint, request, jsonify
import requests
import mysql.connector

api = Blueprint('api', __name__)

cnx = mysql.connector.connect(user=os.environ["AZURE_MYSQL_USER"], password=os.environ["AZURE_MYSQL_PASSWORD"], host=os.environ["AZURE_MYSQL_HOST"], port=3306, database=os.environ["AZURE_MYSQL_NAME"], ssl_ca="DigiCertGlobalRootCA.crt.pem", ssl_disabled=False)

token = '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'

@api.route('/make-comparison', methods=['POST'])
def compare ():
    body = request.json

    print(body)

    API_URL = "https://ts6ke7jk9qtdxz1g.us-east-1.aws.endpoints.huggingface.cloud"
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }

    response = requests.post(API_URL, headers=headers, json=body)

    return response.json()