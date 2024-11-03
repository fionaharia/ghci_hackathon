from flask import Flask, request, jsonify
from flask_cors import CORS
import logging

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
    }
})

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
        
        # Here you can add logic to handle this data
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

if __name__ == '__main__':
    app.run(debug=True, port=5000)