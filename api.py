import os
from flask import Blueprint, request, jsonify
import requests
import mysql.connector
import uuid

api = Blueprint('api', __name__)

cnx = mysql.connector.connect(user=os.environ["AZURE_MYSQL_USER"], password=os.environ["AZURE_MYSQL_PASSWORD"], host=os.environ["AZURE_MYSQL_HOST"], port=3306, database=os.environ["AZURE_MYSQL_NAME"], ssl_ca="DigiCertGlobalRootCA.crt.pem", ssl_disabled=False)

# @api.route('/make-comparison', methods=['GET'])
# def compare ():
#     cursor = cnx.cursor()

#     cursor.execute('SELECT * FROM pairs')

#     rows = cursor.fetchall()

#     cursor.close()

#     return {
#         "response" : rows
#     }
"""
Request:
{
    "cards" : [
        ...cards
    ]
}
Response:
{
    "pairs" : [
        ...inputPairs
    ],
    "evaluations" : [
        ...evaluationsOfPairs
    ]
}
"""
@api.route('/make-comparison', methods=['POST'])
def compare ():
    cards = request.values['cards']
    key = request.values['key']

    inputs = []
    for card in cards:
        inputs.append({
            "text" : card['answer'],
            "text_pair" : card[key]
        })

    API_URL = "https://ts6ke7jk9qtdxz1g.us-east-1.aws.endpoints.huggingface.cloud"
    headers = {
        "Authorization": f"Bearer {os.environ['HF_TOKEN']}",
        "Content-Type": "application/json"
    }

    response = requests.post(API_URL, headers=headers, json={
        "inputs" : inputs
    })

    return response.json(), response.status_code

"""
Request:
{
    "cards" : [
        ...cards
    ],
    "CPEvals" : [
        ...correctParaphraseEvals
    ],
    "IPEvals" : [
        ...incorrectParaphraseEvals
    ]
}
"""
@api.route('/send-pairs', methods=['POST'])
def sendPairs ():
    cards = request.values["cards"]
    cpEvals = request.values["CPEvals"]
    ipEvals = request.values["IPEvals"]

    sID = uuid()

    data = []
    for i, card in enumerate(cards):
        data.append((sID, card['answer'], card['correctParaphrase'], 'True', cpEvals[i]))
        data.append((sID, card['answer'], card['incorrectParaphrase'], 'False', ipEvals[i]))

    query = "INSERT INTO pairs (session_id, text, text_pair, label, model_result) VALUES (%s, %s, %s, %s, %s)"

    cursor = cnx.cursor()

    cursor.executemany(query, data)

    return {
        "message" : "success"
    }, 200
