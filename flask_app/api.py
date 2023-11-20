from flask import Blueprint, request, jsonify

api = Blueprint('api', __name__)

@api.route('/make-comparison', methods=['POST'])
def compare ():
    return {
        "response" : "good"
    }