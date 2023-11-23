import os
from flask import Blueprint, request, jsonify
import requests
import mysql.connector

api = Blueprint('api', __name__)

cnx = mysql.connector.connect(user=os.environ["AZURE_MYSQL_USER"], password=os.environ["AZURE_MYSQL_PASSWORD"], host=os.environ["AZURE_MYSQL_HOST"], port=3306, database=os.environ["AZURE_MYSQL_NAME"], ssl_ca="DigiCertGlobalRootCA.crt.pem", ssl_disabled=False)

@api.route('/make-comparison', methods=['POST'])
def compare ():
    body = {
        "inputs": [
            {
                "text": "hi",
                "text_pair": "hello"
             }
        ]
    }

    API_URL = "https://ts6ke7jk9qtdxz1g.us-east-1.aws.endpoints.huggingface.cloud"
    headers = {
        "Authorization": f"Bearer {os.environ['HF_TOKEN']}",
        "Content-Type": "application/json"
    }

    response = requests.post(API_URL, headers=headers, json=body)

    return response