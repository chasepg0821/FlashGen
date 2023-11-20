import os
from flask import Flask, send_from_directory, request, jsonify
from api import api

app = Flask(__name__, static_folder='../build')
app.register_blueprint(api, url_prefix="/api")

# Serve React App
@app.route("/")
def serve():
    return send_from_directory(app.static_folder, "index.html")


@app.route("/<path:path>")
def static_proxy(path):
    file_name = path.split("/")[-1]
    dir_name = os.path.join(app.static_folder, "/".join(path.split("/")[:-1]))
    return send_from_directory(dir_name, file_name)


@app.errorhandler(404)
def handle_404(e):
    if request.path.startswith("/api/"):
        return jsonify(message="Resource not found"), 404
    return send_from_directory(app.static_folder, "index.html")


@app.errorhandler(405)
def handle_405(e):
    if request.path.startswith("/api/"):
        return jsonify(message="Mehtod not allowed"), 405
    return e

if __name__ == '__main__':
    app.run(use_reloader=True, port=5000, threaded=True)
