import pandas as pd

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

def calculate_lifecycle_impact(selected_resources):
    total_impact = 0
    details = {}

    for resource in selected_resources:
        if resource in lifecycle_data:
            stages = lifecycle_data[resource]
            # Calculate total impact for each resource, excluding the duration
            impact = sum(value for key, value in stages.items() if isinstance(value, (int, float)))
            total_impact += impact
            details[resource] = {
                "impact": impact,
                "details": stages
            }
    
    return total_impact, details

def main():
    print("Welcome to the Lifecycle Impact Analysis Tool!")
    print("Available resources: plastic_bottle, paper_cup, aluminum_can, glass_bottle")
    
    # Take user input for resources
    user_input = input("Please enter the resources you want to analyze (comma-separated): ")
    selected_resources = [resource.strip() for resource in user_input.split(',')]
    
    total_impact, details = calculate_lifecycle_impact(selected_resources)

    # Display results
    print("\n--- Lifecycle Impact Analysis Report ---")
    print(f"Total Carbon Footprint: {total_impact:.2f} kg CO2")
    
    for resource, result in details.items():
        print(f"\nResource: {resource}")
        print(f"  Total Impact: {result['impact']:.2f} kg CO2")
        print("  Breakdown by lifecycle stage:")
        for stage, impact in result['details'].items():
            print(f"    {stage.capitalize()}: {impact} kg CO2")
        print(f"  Duration until fully degraded: {result['details']['duration']}")

if __name__ == "__main__":
    main()
