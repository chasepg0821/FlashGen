import os
from flask import Blueprint, request, jsonify

api = Blueprint('api', __name__)

# def connect():
#     return mysql.connector.connect(user=os.environ[{username}], password=os.environ[{password}], host=os.environ[{host}], port=3306, database=os.environ[{db}], ssl_ca="DigiCertGlobalRootCA.crt.pem", ssl_disabled=False)

## EXAMPLE PYTHON CODE TO MAKE QUERIES ##

# cnx = connect()
# cursor = cnx.cursor()

# query = "INSERT INTO pairs (session_id, text, text_pair, label, model_result) VALUES (%s, %s, %s, %s, %s)"

# cursor.executemany(query, data)
# rows = cursor.rowcount

# cnx.commit()
# cursor.close()
# cnx.close()


# return {
#     "message" : f"Rows edited: {rows}"
# }, 200

@api.route('/example', methods=['POST', 'GET'])
def example ():
    if request.method == 'GET':
        reqArg = request.args.get("key")

        return {
            "resBody": reqArg
        }, 200
    else:
        reqBody = request.json

        return {
            "resBody": reqBody
        }, 200




