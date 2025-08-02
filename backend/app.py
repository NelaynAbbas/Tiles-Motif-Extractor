import os
import cv2
import numpy as np
from flask import Flask, request, jsonify, send_from_directory
from ultralytics import YOLO
from rembg import remove
from PIL import Image
from flask_cors import CORS
import logging

app = Flask(__name__)
CORS(app)

# Set up logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

UPLOAD_FOLDER = "uploads"
OUTPUT_FOLDER = "outputs"
MODEL_PATH = "model/my_model.pt"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(OUTPUT_FOLDER, exist_ok=True)

try:
    model = YOLO(MODEL_PATH)  # Load YOLO model
    print(f"Successfully loaded YOLO model from {MODEL_PATH}")
    logger.info(f"Successfully loaded YOLO model from {MODEL_PATH}")
except Exception as e:
    logger.error(f"Failed to load YOLO model: {str(e)}")
    raise

CONFIDENCE_THRESHOLD = 0.6

@app.route("/upload", methods=["POST"])
def upload_file():
    try:
        logger.debug("Received upload request")
        if "image" not in request.files:
            logger.error("No image file in request")
            return jsonify({"error": "No image provided"}), 400
        
        image_file = request.files["image"]
        logger.debug(f"Received file: {image_file.filename}")
        
        image_path = os.path.join(UPLOAD_FOLDER, image_file.filename)
        image_file.save(image_path)
        logger.debug(f"Saved file to: {image_path}")

        # Read image
        image = cv2.imread(image_path)
        if image is None:
            logger.error("Failed to read image")
            return jsonify({"error": "Failed to read image"}), 400
            
        logger.debug("Running YOLO model")
        results = model(image)[0]
        logger.debug(f"YOLO results: {len(results.boxes)} detections")

        object_count = 0
        extracted_files = []

        for i, (box, score) in enumerate(zip(results.boxes.xyxy, results.boxes.conf)):
            if score < CONFIDENCE_THRESHOLD:
                continue
            
            x_min, y_min, x_max, y_max = map(int, box.tolist())
            cropped_object = image[y_min:y_max, x_min:x_max]
            cropped_pil = Image.fromarray(cv2.cvtColor(cropped_object, cv2.COLOR_BGR2RGB))
            transparent_object = remove(cropped_pil)

            motif_filename = f"motif_{object_count}.png"
            transparent_path = os.path.join(OUTPUT_FOLDER, motif_filename)
            transparent_object.save(transparent_path)
            
            extracted_files.append(motif_filename)
            object_count += 1
            logger.debug(f"Extracted motif {object_count}")

        if object_count == 0:
            logger.info("No motifs detected")
            return jsonify({"message": "No motifs detected"}), 200
            
        logger.info(f"Successfully extracted {object_count} motifs")
        return jsonify({"message": "Motifs extracted", "motifs": extracted_files})

    except Exception as e:
        logger.error(f"Error processing upload: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route("/motifs/<filename>")
def get_motif(filename):
    try:
        return send_from_directory(OUTPUT_FOLDER, filename)
    except Exception as e:
        logger.error(f"Error serving motif file: {str(e)}")
        return jsonify({"error": "File not found"}), 404

if __name__ == "__main__":
    app.run(debug=True)
