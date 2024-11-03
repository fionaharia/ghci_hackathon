# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import logging

# # Configure logging
# logging.basicConfig(level=logging.DEBUG)
# logger = logging.getLogger(__name__)

# app = Flask(__name__)
# # Configure CORS more explicitly
# CORS(app, resources={
#     r"/submit_event": {
#         "origins": ["http://localhost:3000"],  # Add your React app's URL
#         "methods": ["POST"],
#         "allow_headers": ["Content-Type"]
#     }
# })
# @app.route('/')
# def home():
#     return "<h1>Welcome to the Event Planning API</h1>"

# @app.route('/submit_event', methods=['POST'])
# def submit_event():

#     try:
#         logger.info("Received request at /submit_event")
#         logger.debug(f"Request headers: {request.headers}")
        
#         # Get JSON data from the POST request
#         data = request.json
#         logger.debug(f"Received data: {data}")
        
#         area = data.get("area")
#         occasion = data.get("occasion")
#         num_people = data.get("num_people")
#         budget = data.get("budget")
        
#         # Here you can add logic to handle this data
#         response = {
#             "status": "success",
#             "message": "Event data received",
#             "data": {
#                 "area": area,
#                 "occasion": occasion,
#                 "num_people": num_people,
#                 "budget": budget
#             }
#         }
#         return jsonify(response), 200
        
#     except Exception as e:
#         logger.error(f"Error processing request: {str(e)}")
#         return jsonify({"status": "error", "message": str(e)}), 500

# if __name__ == '__main__':
#     app.run(debug=True, port=5000)



from flask import Flask, request, jsonify
from flask_cors import CORS
import logging
import torch
import torch.nn as nn
import numpy as np
import matplotlib.pyplot as plt
import random
import cloudinary
import cloudinary.uploader
import pickle
import pandas as pd

# Configure logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

app = Flask(__name__)
# Configure CORS more explicitly
CORS(app, resources={
    r"/submit_event": {
        "origins": ["http://localhost:3000"],  # Add your React app's URL
        "methods": ["POST"],
        "allow_headers": ["Content-Type"]
    },
    r"/generate_layout": {
        "origins": ["http://localhost:3000"],
        "methods": ["POST"],
        "allow_headers": ["Content-Type"]
    },
    r"/calculate_footprint": {
        "origins": ["http://localhost:3000"],
        "methods": ["POST"],
        "allow_headers": ["Content-Type"]
    }
})

@app.route('/')
def home():
    return "<h1>Welcome to the Event Planning API</h1>"

@app.route('/submit_event', methods=['POST'])
def submit_event():
    try:
        logger.info("Received request at /submit_event")
        logger.debug(f"Request headers: {request.headers}")

        # Get JSON data from the POST request
        data = request.json
        logger.debug(f"Received data: {data}")

        area = data.get("area")
        occasion = data.get("occasion")
        num_people = data.get("num_people")
        budget = data.get("budget")

        response = {
            "status": "success",
            "message": "Event data received",
            "data": {
                "area": area,
                "occasion": occasion,
                "num_people": num_people,
                "budget": budget
            }
        }
        return jsonify(response), 200

    except Exception as e:
        logger.error(f"Error processing request: {str(e)}")
        return jsonify({"status": "error", "message": str(e)}), 500

@app.route('/generate_layout', methods=['POST'])
def generate_layout():
    # Cloudinary configuration
    cloudinary.config( 
        cloud_name = "dyus1ppjl", 
        api_key = "585398194936427", 
        api_secret = "07Ft-ngw9Z4PvQvfvDNQDpey_vc", 
        secure=True
    )

    latent_dim = 100
    layout_size = 8  # Size of the event layout (layout_size x layout_size)

    class Generator(nn.Module):
        def __init__(self):
            super(Generator, self).__init__()
            self.fc = nn.Sequential(
                nn.Linear(latent_dim, 256),
                nn.ReLU(),
                nn.Linear(256, 512),
                nn.ReLU(),
                nn.Linear(512, layout_size * layout_size * 4),
                nn.Tanh()
            )

        def forward(self, z):
            return self.fc(z)

    # Initialize models
    generator = Generator()

    # Load the saved model weights
    generator.load_state_dict(torch.load('models/generator.pth'))
    generator.eval()

    # Generate layout
    z = torch.randn(1, latent_dim)
    generated_flat_layout = generator(z).detach().numpy().flatten()
    generated_flat_layout = np.clip(generated_flat_layout, 0, None)
    generated_layout = []

    for i in range(layout_size):
        row = []
        for j in range(layout_size):
            index = (i * layout_size + j) * 4
            cell = {
                "cell_type": "seating" if random.random() < 0.7 else "food",
                "area": generated_flat_layout[index],
                "lighting_efficiency": generated_flat_layout[index + 1],
                "proximity_to_stage": int(generated_flat_layout[index + 2]) if not np.isnan(generated_flat_layout[index + 2]) else 0,
                "sustainability_score": generated_flat_layout[index + 3]
            }
            row.append(cell)
        generated_layout.append(row)

    # Plot and save layout
    plt.figure(figsize=(8, 8))
    for i in range(layout_size):
        for j in range(layout_size):
            cell = generated_layout[i][j]
            plt.gca().add_patch(plt.Rectangle((j, layout_size - 1 - i), 1, 1,
                                                color='green' if cell["cell_type"] == "seating" else 'red',
                                                alpha=0.5))

    plt.xlim(0, layout_size)
    plt.ylim(0, layout_size)
    plt.gca().set_aspect('equal', adjustable='box')
    plt.title("Generated Event Layout")
    plt.xlabel("Width")
    plt.ylabel("Height")
    image_path = 'generated_layout.png'
    plt.savefig(image_path, dpi=300)

    # Upload to Cloudinary
    response = cloudinary.uploader.upload(image_path)
    layout_url = response['url']

    return jsonify({"status": "success", "image_url": layout_url}), 200

@app.route('/calculate_footprint', methods=['POST'])
def calculate_footprint():
    # Load the trained model from the pickle file
    with open('trained_model.pkl', 'rb') as file:
        model = pickle.load(file)

    try:
        data = request.json
        travel_distance = data.get("travel_distance")
        mode_of_transport = data.get("mode_of_transport")
        catering_type = data.get("catering_type")
        materials_used = data.get("materials_used")

        # Convert inputs to a DataFrame
        input_data = pd.DataFrame({
            'travel_distance': [travel_distance],
            'materials_used': [materials_used],
            'mode_of_transport_bus': [1 if mode_of_transport == 'bus' else 0],
            'mode_of_transport_plane': [1 if mode_of_transport == 'plane' else 0],
            'mode_of_transport_train': [1 if mode_of_transport == 'train' else 0],
            'catering_type_plant-based': [1 if catering_type == 'plant-based' else 0],
            'catering_type_mixed': [1 if catering_type == 'mixed' else 0]
        })

        # Predict the carbon footprint using the model
        carbon_footprint = model.predict(input_data)[0]

        return jsonify({"status": "success", "carbon_footprint": carbon_footprint}), 200

    except Exception as e:
        logger.error(f"Error calculating carbon footprint: {str(e)}")
        return jsonify({"status": "error", "message": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
