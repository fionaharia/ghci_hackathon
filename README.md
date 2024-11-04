# EcoSphere

EcoSphere is an innovative web application designed to assist users in planning sustainable events. It provides a comprehensive platform where users can select event details such as location, budget, number of attendees, and event type. EcoSphere generates eco-friendly options for decor and waste management, evaluates carbon footprint, and provides lifecycle analysis for each choice.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Event Planning**: Users can select location, budget, number of attendees, and event type to view available venues.
- **Material Selection**: Users can choose materials for decor and waste management systems, with pros and cons displayed for each option.
- **Layout Generation**: Generate an optimized event layout based on user preferences using Generative Adversarial Networks (GANs).
- **Carbon Footprint Calculator**: Estimate the carbon footprint of the event and explore options to reduce emissions.
- **Lifecycle Analysis**: View detailed lifecycle analysis for materials chosen.
- **Sustainability Certifications**: Access certification information for vendors and materials to ensure eco-friendly choices.

## Technologies Used

- **Frontend**: Next.js, React.js
- **Backend**: Flask, Cloudinary
- **Machine Learning**: TensorFlow, Torch, scikit learn

## Installation

To run EcoSphere locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/ecosphere.git
   cd frontend
   npm i
   npm run dev
   cd backend
   python app.py
