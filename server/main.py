import json
import numpy as np
import tensorflow as tf


from flask import Flask, jsonify, request
from gradio_client import Client
from flask_cors import CORS  
from PIL import Image
import io


app = Flask(__name__)
CORS(app)  


model = tf.keras.models.load_model("./model/crop_pred.keras")
names = ['Apple___Apple_scab',
  'Apple___Black_rot',
  'Apple___Cedar_apple_rust',
  'Apple___healthy',
  'Blueberry___healthy',
  'Cherry___healthy',
  'Cherry___Powdery_mildew',
  'Corn___Cercospora_leaf_spot Gray_leaf_spot',
  'Corn___Common_rust',
  'Corn___healthy',
  'Corn___Northern_Leaf_Blight',
  'Grape___Black_rot',
  'Grape___Esca_(Black_Measles)',
  'Grape___healthy',
  'Grape___Leaf_blight_(Isariopsis_Leaf_Spot)',
  'Orange___Haunglongbing_(Citrus_greening)',
  'Peach___Bacterial_spot',
  'Peach___healthy',
  'Pepper,_bell___Bacterial_spot',
  'Pepper,_bell___healthy',
  'Potato___Early_blight',
  'Potato___healthy',
  'Potato___Late_blight',
  'Raspberry___healthy',
  'Soybean___healthy',
  'Squash___Powdery_mildew',
  'Strawberry___healthy',
  'Strawberry___Leaf_scorch',
  'Tomato___Bacterial_spot',
  'Tomato___Early_blight',
  'Tomato___healthy',
  'Tomato___Late_blight',
  'Tomato___Leaf_Mold',
  'Tomato___Septoria_leaf_spot',
  'Tomato___Spider_mites Two-spotted_spider_mite',
  'Tomato___Target_Spot',
  'Tomato___Tomato_mosaic_virus',
  'Tomato___Tomato_Yellow_Leaf_Curl_Virus']

@app.route("/api/predict", methods=["POST"])
def predict():
    print(request.headers)  # Print headers for debugging
    print(request.files)
    
    print("Headers:", request.headers)
    print("Files:", request.files)
    print("Form Data:", request.form)

    if 'image' not in request.files:
        return jsonify({"error": "No file part in the request"}), 400

    file = request.files['image']

    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    
    
    file = request.files["image"]
    image = Image.open(io.BytesIO(file.read())).resize((128, 128))
    image_array = np.array(image)/255.0
    image_array = np.expand_dims(image_array, axis=0)
    
    predictions = model.predict(image_array)
    prediction = np.argmax(predictions[0])
    print(prediction)
    return jsonify({"prediction": names[prediction]})



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
