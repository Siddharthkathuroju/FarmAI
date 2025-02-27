from flask import Flask, jsonify, request
from gradio_client import Client
import json
from flask_cors import CORS  



app = Flask(__name__)
CORS(app)  

@app.route("/api/model", methods=["POST"])
def get_response():
    data = request.get_json()
    input_text = data["text"]
    client = Client("https://fc7916e1fa48fbd040.gradio.live")
    result = client.predict(
        input_data= json.dumps({"query":input_text}),
        api_name="/predict"
    )
    return jsonify(result)

@app.route("/api/hello", methods=["GET"])
def hello():
    return jsonify({"message": "Hello, Flask API!"})

if __name__ == "__main__":
    app.run(debug=True)
