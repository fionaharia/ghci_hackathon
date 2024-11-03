import pandas as pd
import matplotlib.pyplot as plt
from fpdf import FPDF
import os

# Simulated detailed lifecycle impact data for various resources
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

# Certification criteria
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
            plt.savefig(f'{resource}_impact.png')  # Save the plot as an image
            plot_images.append(f'{resource}_impact.png')
            plt.close()
    
    return plot_images

def check_certification_progress(certification_type, selected_resources):
    if certification_type in certification_criteria:
        criteria = certification_criteria[certification_type]["criteria"]
        total_points = 0

        # Mock example logic for point calculation based on selected resources
        if certification_type == "LEED":
            # Example logic for LEED
            total_points += min(len(selected_resources), criteria["energy_efficiency"])  # Simple example
            total_points += min(len(selected_resources), criteria["water_efficiency"])
            total_points += min(len(selected_resources), criteria["sustainable_sites"])
            total_points += min(len(selected_resources), criteria["materials_and_resources"])
        
        elif certification_type == "ISO 20121":
            # Example logic for ISO 20121
            total_points += min(len(selected_resources), criteria["stakeholder_engagement"])  # Simple example
            total_points += min(len(selected_resources), criteria["environmental_impact"])
            total_points += min(len(selected_resources), criteria["supply_chain"])

        points_required = certification_criteria[certification_type]["points_required"]
        return total_points, points_required

    return 0, 0


def create_pdf_report(total_impact, details, layout_image, certification_info, plot_images, certification_type, certification_points, points_required):
    pdf = FPDF()
    pdf.set_auto_page_break(auto=True, margin=15)
    pdf.add_page()

    # Title
    pdf.set_font("Arial", 'B', 16)
    pdf.cell(0, 10, "Sustainability Report", ln=True, align='C')

    # Total Impact
    pdf.set_font("Arial", size=12)
    pdf.cell(0, 10, f"Total Carbon Footprint: {total_impact:.2f} kg CO2", ln=True)

    # Add Lifecycle Impact Details
    for resource, result in details.items():
        pdf.cell(0, 10, f"\nResource: {resource.capitalize()}", ln=True)
        pdf.cell(0, 10, f"  Total Impact: {result['impact']:.2f} kg CO2", ln=True)
        pdf.cell(0, 10, "  Breakdown by lifecycle stage:", ln=True)
        for stage, impact in result['details'].items():
            if isinstance(impact, (int, float)):
                pdf.cell(0, 10, f"    {stage.capitalize()}: {impact} kg CO2", ln=True)
        pdf.cell(0, 10, f"  Duration until fully degraded: {result['details']['duration']}", ln=True)

    # Add Layout Image
    pdf.cell(0, 10, "\nGenerated Layout:", ln=True)
    pdf.image(layout_image, x=10, w=190)  # Adjust the width as needed

    # Add Lifecycle Impact Plot Images
    for plot_image in plot_images:
        pdf.cell(0, 10, f"\nLifecycle Impact Plot for {plot_image.split('_')[0].capitalize()}:", ln=True)
        pdf.image(plot_image, x=10, w=190)  # Adjust the width as needed

    # Add Certification Information
    pdf.cell(0, 10, "\nCertification and Compliance Guidance:", ln=True)
    pdf.multi_cell(0, 10, certification_info)
    pdf.cell(0, 10, f"\nSelected Certification Type: {certification_type}", ln=True)
    pdf.cell(0, 10, f"Points Earned: {certification_points} / Points Required: {points_required}", ln=True)

    # Save the PDF
    pdf.output("sustainability_report.pdf")

def main():
    print("Welcome to the Lifecycle Impact Analysis Tool!")
    print("Available resources: plastic_bottle, paper_cup, aluminum_can, glass_bottle")
    
    # Take user input for resources
    user_input = input("Please enter the resources you want to analyze (comma-separated): ")
    selected_resources = [resource.strip() for resource in user_input.split(',')]
    
    # Take layout image and certification info as inputs
    layout_image = "generated_layout.png"
    
    # Choose certification
    certification_type = input("Please select a certification type (LEED or ISO 20121): ")
    certification_info = input("Please enter additional certification information: ")

    total_impact, details = calculate_lifecycle_impact(selected_resources)
    plot_images = plot_lifecycle_impact(selected_resources)

    # Check certification progress
    certification_points, points_required = check_certification_progress(certification_type, selected_resources)

    create_pdf_report(total_impact, details, layout_image, certification_info, plot_images, certification_type, certification_points, points_required)

    print("Sustainability report generated successfully: sustainability_report.pdf")

if __name__ == "__main__":
    main()
