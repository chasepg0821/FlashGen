import os
from flask import Flask, send_from_directory, request, jsonify
from api import api

application = Flask(__name__, static_folder='./build')
application.register_blueprint(api, url_prefix="/api")

# Serve React App
@application.route("/")
def serve():
    return send_from_directory(application.static_folder, "index.html")


@application.route("/<path:path>")
def static_proxy(path):
    file_name = path.split("/")[-1]
    dir_name = os.path.join(application.static_folder, "/".join(path.split("/")[:-1]))
    return send_from_directory(dir_name, file_name)


@application.errorhandler(404)
def handle_404(e):
    if request.path.startswith("/api/"):
        return jsonify(message="Resource not found"), 404
    return send_from_directory(application.static_folder, "index.html")


@application.errorhandler(405)
def handle_405(e):
    if request.path.startswith("/api/"):
        return jsonify(message="Method not allowed"), 405
    return e

if __name__ == '__main__':
    application.debug=True
    application.run()
    