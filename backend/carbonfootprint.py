import pickle
import pandas as pd

# Load the trained model from the pickle file
with open('trained_model.pkl', 'rb') as file:
    model = pickle.load(file)

# Function to calculate carbon footprint
def calculate_carbon_footprint():
    # Take user inputs from the terminal
    travel_distance = float(input("Enter travel distance (in miles): "))
    mode_of_transport = input("Enter mode of transport (car, bus, plane, train): ")
    catering_type = input("Enter catering type (meat-based, plant-based, mixed): ")
    materials_used = float(input("Enter amount of materials used (in kg): "))

    # Convert inputs to a DataFrame (this assumes you used dummy variables for categorical data)
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
    print(f"The estimated carbon footprint for this event setup is: {carbon_footprint:.2f} kg CO₂")

# Call the function to run the calculation
calculate_carbon_footprint()
