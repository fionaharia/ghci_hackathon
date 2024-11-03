from flask import Flask, request, jsonify, send_file
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
from fpdf import FPDF

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

lifecycle_data = {
    "plastic_bottle": {
        "extraction": 1.2,   # CO2 emissions in kg
        "manufacturing": 2.0,
        "transportation": 0.5,
        "usage": 0.1,
        "disposal": 0.3,
        "duration": "450 years"  # Duration until fully degraded
    },
    "paper_cup": {
        "extraction": 1.0,
        "manufacturing": 1.5,
        "transportation": 0.4,
        "usage": 0.05,
        "disposal": 0.2,
        "duration": "30 years"
    },
    "aluminum_can": {
        "extraction": 1.5,
        "manufacturing": 2.2,
        "transportation": 0.6,
        "usage": 0.1,
        "disposal": 0.4,
        "duration": "200 years"
    },
    "glass_bottle": {
        "extraction": 1.8,
        "manufacturing": 2.5,
        "transportation": 0.7,
        "usage": 0.1,
        "disposal": 0.2,
        "duration": "1 million years"
    }
}

@app.route('/lifecycle_impact', methods=['POST'])
def lifecycle_impact():
    data = request.json
    resources = data.get("resources")  # List of selected resources

    total_impact = 0
    details = {}

    for resource in resources:
        if resource in lifecycle_data:
            stages = lifecycle_data[resource]
            # Calculate total impact for each resource
            impact = sum(stages.values())
            total_impact += impact
            details[resource] = {
                "impact": impact,
                "details": stages
            }

    report = {
        "total_impact": total_impact,
        "details": details
    }

    return jsonify({"status": "success", "lifecycle_report": report}), 200
certification_criteria = {
    "LEED": {
        "points_required": 40,
        "criteria": {
            "energy_efficiency": 10,
            "water_efficiency": 5,
            "sustainable_sites": 7,
            "materials_and_resources": 6
        }
    },
    "ISO 20121": {
        "points_required": 50,
        "criteria": {
            "stakeholder_engagement": 15,
            "environmental_impact": 20,
            "supply_chain": 15
        }
    }
}

@app.route('/certification_tracker', methods=['POST'])
def certification_tracker():
    user_data = request.json  # User's choices
    selected_certifications = user_data.get("certifications")
    
    report = {}
    for cert in selected_certifications:
        if cert in certification_criteria:
            criteria = certification_criteria[cert]["criteria"]
            score = sum(criteria.values())  # This could be a function to calculate based on user's choices
            progress = (score / certification_criteria[cert]["points_required"]) * 100
            report[cert] = {"score": score, "progress": progress}

    return jsonify({"status": "success", "certification_report": report}), 200

@app.route('/generate_report', methods=['POST'])
def calculate_lifecycle_impact(selected_resources):
    total_impact = 0
    details = {}

    for resource in selected_resources:
        if resource in lifecycle_data:
            stages = lifecycle_data[resource]
            impact = sum(value for value in stages.values() if isinstance(value, (int, float)))
            total_impact += impact
            details[resource] = {
                "impact": impact,
                "details": stages
            }
    
    return total_impact, details
def plot_lifecycle_impact(selected_resources):
    plot_images = []
    for resource in selected_resources:
        if resource in lifecycle_data:
            stages = lifecycle_data[resource]
            stage_names = list(stages.keys())
            stage_values = [stages[stage] for stage in stage_names if isinstance(stages[stage], (int, float))]

            plt.figure(figsize=(8, 5))
            plt.bar(stage_names[:len(stage_values)], stage_values, color='skyblue')
            plt.title(f'Lifecycle Impact for {resource.capitalize()}')
            plt.xlabel('Lifecycle Stages')
            plt.ylabel('CO2 Emissions (kg)')
            plt.xticks(rotation=45)
            plt.tight_layout()
            plt.savefig(f'{resource}_impact.png')  
            plot_images.append(f'{resource}_impact.png')
            plt.close()
    
    return plot_images
def check_certification_progress(certification_type, selected_resources):
    if certification_type in certification_criteria:
        criteria = certification_criteria[certification_type]["criteria"]
        total_points = 0

        if certification_type == "LEED":
          
            total_points += min(len(selected_resources), criteria["energy_efficiency"])  
            total_points += min(len(selected_resources), criteria["water_efficiency"])
            total_points += min(len(selected_resources), criteria["sustainable_sites"])
            total_points += min(len(selected_resources), criteria["materials_and_resources"])
        
        elif certification_type == "ISO 20121":
          
            total_points += min(len(selected_resources), criteria["stakeholder_engagement"])  
            total_points += min(len(selected_resources), criteria["environmental_impact"])
            total_points += min(len(selected_resources), criteria["supply_chain"])

        points_required = certification_criteria[certification_type]["points_required"]
        return total_points, points_required

    return 0, 0
def create_pdf_report(total_impact, details, layout_image, certification_info, plot_images, certification_type, certification_points, points_required):
    pdf = FPDF()
    pdf.set_auto_page_break(auto=True, margin=15)
    pdf.add_page()
    pdf.set_font("Arial", 'B', 16)
    pdf.cell(0, 10, "Sustainability Report", ln=True, align='C')
    pdf.set_font("Arial", size=12)
    pdf.cell(0, 10, f"Total Carbon Footprint: {total_impact:.2f} kg CO2", ln=True)
    for resource, result in details.items():
        pdf.cell(0, 10, f"\nResource: {resource.capitalize()}", ln=True)
        pdf.cell(0, 10, f"  Total Impact: {result['impact']:.2f} kg CO2", ln=True)
        pdf.cell(0, 10, "  Breakdown by lifecycle stage:", ln=True)
        for stage, impact in result['details'].items():
            if isinstance(impact, (int, float)):
                pdf.cell(0, 10, f"    {stage.capitalize()}: {impact} kg CO2", ln=True)
        pdf.cell(0, 10, f"  Duration until fully degraded: {result['details']['duration']}", ln=True)


    pdf.cell(0, 10, "\nGenerated Layout:", ln=True)
    pdf.image(layout_image, x=10, w=190) 

    
    for plot_image in plot_images:
        pdf.cell(0, 10, f"\nLifecycle Impact Plot for {plot_image.split('_')[0].capitalize()}:", ln=True)
        pdf.image(plot_image, x=10, w=190)  
    pdf.cell(0, 10, "\nCertification and Compliance Guidance:", ln=True)
    pdf.multi_cell(0, 10, certification_info)
    pdf.cell(0, 10, f"\nSelected Certification Type: {certification_type}", ln=True)
    pdf.cell(0, 10, f"Points Earned: {certification_points} / Points Required: {points_required}", ln=True)

    pdf.output("sustainability_report.pdf")

def generate_report():
    data = request.json
    selected_resources = data.get("resources", [])
    layout_image_url = data.get("layout_image_url")
    certification_type = data.get("certification_type")
    certification_info = data.get("certification_info", "")

    # Download the image from Cloudinary
    layout_image = layout_image_url  # This should already be a Cloudinary URL
    
    total_impact, details = calculate_lifecycle_impact(selected_resources)
    plot_images = plot_lifecycle_impact(selected_resources)
    certification_points, points_required = check_certification_progress(certification_type, selected_resources)

    # Generate the PDF report
    create_pdf_report(total_impact, details, layout_image, certification_info, plot_images, certification_type, certification_points, points_required)

    # Return the generated PDF file
    return send_file("sustainability_report.pdf", as_attachment=True)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
