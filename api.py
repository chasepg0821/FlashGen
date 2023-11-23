import os
from flask import Blueprint, request, jsonify
import mysql.connector

api = Blueprint('api', __name__)

cnx = mysql.connector.connect(user=os.environ["AZURE_MYSQL_USER"], password=os.environ["AZURE_MYSQL_PASSWORD"], host=os.environ["AZURE_MYSQL_HOST"], port=3306, database=os.environ["AZURE_MYSQL_NAME"], ssl_ca="DigiCertGlobalRootCA.crt.pem", ssl_disabled=False)

@api.route('/make-comparison', methods=['POST', 'GET'])
def compare ():
    cursor = cnx.cursor()

    query = ("SELECT * FROM pairs")

    cursor.execute(query)

    rows = []

    for row in cursor:
        rows.append(row)

    cursor.close()

    return {
        "response" : rows
    }