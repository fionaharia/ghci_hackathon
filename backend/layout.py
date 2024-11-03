# import torch
# import torch.nn as nn
# import numpy as np
# import matplotlib.pyplot as plt
# import torch.optim as optim
# import random

# # Define your Generator and Discriminator classes as before
# latent_dim = 100
# layout_size = 8  # Size of the event layout (layout_size x layout_size)

# class Generator(nn.Module):
#     def __init__(self):
#         super(Generator, self).__init__()
#         self.fc = nn.Sequential(
#             nn.Linear(latent_dim, 256),
#             nn.ReLU(),
#             nn.Linear(256, 512),
#             nn.ReLU(),
#             nn.Linear(512, layout_size * layout_size * 4),  # Output size for 4 features
#             nn.Tanh()  # Use Tanh to normalize output to [-1, 1]
#         )

#     def forward(self, z):
#         return self.fc(z)

# class Discriminator(nn.Module):
#     def __init__(self):
#         super(Discriminator, self).__init__()
#         self.fc = nn.Sequential(
#             nn.Linear(layout_size * layout_size * 4, 512),  # Input size for 4 features
#             nn.ReLU(),
#             nn.Linear(512, 256),
#             nn.ReLU(),
#             nn.Linear(256, 1),
#             nn.Sigmoid()  # Output between 0 and 1
#         )

#     def forward(self, x):
#         return self.fc(x)

# # Initialize models
# generator = Generator()
# discriminator = Discriminator()

# # Load the saved model weights
# generator.load_state_dict(torch.load('models/generator.pth'))
# discriminator.load_state_dict(torch.load('models/discriminator.pth'))

# # Set the models to evaluation mode
# generator.eval()
# discriminator.eval()

# # Function to create irregular shapes
# def create_irregular_shape(center, area):
#     return {
#         "center": center,
#         "area": area
#     }

# # User input for generating a new layout
# type_of_event = input("Enter the type of event (e.g., wedding): ")
# num_attendees = int(input("Enter the number of attendees: "))
# seating_preferences = input("Enter seating preferences (comma-separated): ")

# # Generate a new layout based on the trained GAN
# def generate_layout(generator, layout_size):
#     z = torch.randn(1, latent_dim)  # Generate latent vector
#     generated_flat_layout = generator(z).detach().numpy().flatten()

#     # Ensure valid values
#     generated_flat_layout = np.clip(generated_flat_layout, 0, None)  # Remove negative values
#     generated_layout = []
#     for i in range(layout_size):
#         row = []
#         for j in range(layout_size):
#             index = (i * layout_size + j) * 4
#             cell = {
#                 "cell_type": "seating" if random.random() < 0.7 else "food",
#                 "area": generated_flat_layout[index],
#                 "lighting_efficiency": generated_flat_layout[index + 1],
#                 "proximity_to_stage": int(generated_flat_layout[index + 2]) if not np.isnan(generated_flat_layout[index + 2]) else 0,
#                 "sustainability_score": generated_flat_layout[index + 3],
#                 "shape": create_irregular_shape((i + 0.5, j + 0.5), generated_flat_layout[index])
#             }
#             row.append(cell)
#         generated_layout.append(row)
#     return generated_layout

# generated_layout = generate_layout(generator, layout_size)

# # Print the generated layout
# for row in generated_layout:
#     print(row)

# # Optionally, you can visualize and save the layout as before
# plt.figure(figsize=(8, 8))
# for i in range(layout_size):
#     for j in range(layout_size):
#         cell = generated_layout[i][j]
#         plt.gca().add_patch(plt.Rectangle((j, layout_size - 1 - i), 1, 1,
#                                             color='green' if cell["cell_type"] == "seating" else 'red',
#                                             alpha=0.5))  # Color based on cell type

# plt.xlim(0, layout_size)
# plt.ylim(0, layout_size)
# plt.gca().set_aspect('equal', adjustable='box')
# plt.title(f"Generated Layout for {type_of_event} ({num_attendees} Attendees)")
# plt.xlabel("Width")
# plt.ylabel("Length")

# # Save the layout as an image
# plt.savefig('generated_layout.png', dpi=300)
# plt.show()  # Optional: Display the layout




import torch
import torch.nn as nn
import numpy as np
import matplotlib.pyplot as plt
import random
import cloudinary
import cloudinary.uploader

# Cloudinary configuration
cloudinary.config( 
    cloud_name = "dyus1ppjl", 
    api_key = "585398194936427", 
    api_secret = "07Ft-ngw9Z4PvQvfvDNQDpey_vc", # Click 'View API Keys' above to copy your API secret
    secure=True
)

# Define colors for plotting
colors = ["#E94FE6", "#F2E7D3", "#EBCBB0", "#223E5B", "#F69176", "#FCF8F3"]

# Plot layout function
def plot_layout(layout):
    plt.figure(figsize=(8, 8))
    for i in range(len(layout)):
        for j in range(len(layout[i])):
            cell = layout[i][j]
            area = cell['area'] * 100  # Scale area for visibility
            color = random.choice(colors)  # Choose a random color for the cell
            rect = plt.Rectangle((j, i), 1, 1, color=color, alpha=0.5)  # Create a rectangle for the cell
            plt.gca().add_patch(rect)  # Add the rectangle to the plot
            plt.text(j + 0.5, i + 0.5, f"{cell['cell_type']}\n({cell['proximity_to_stage']})",
                     ha='center', va='center', fontsize=8, color='black')

    plt.xlim(0, layout_size)
    plt.ylim(0, layout_size)
    plt.gca().set_aspect('equal', adjustable='box')  # Keep aspect ratio
    plt.grid()
    plt.title(f'Event Layout for {type_of_event} ({num_attendees} Attendees)')
    plt.xlabel('Width')
    plt.ylabel('Height')

# Define your Generator and Discriminator classes as before
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
            nn.Linear(512, layout_size * layout_size * 4),  # Output size for 4 features
            nn.Tanh()  # Use Tanh to normalize output to [-1, 1]
        )

    def forward(self, z):
        return self.fc(z)

class Discriminator(nn.Module):
    def __init__(self):
        super(Discriminator, self).__init__()
        self.fc = nn.Sequential(
            nn.Linear(layout_size * layout_size * 4, 512),  # Input size for 4 features
            nn.ReLU(),
            nn.Linear(512, 256),
            nn.ReLU(),
            nn.Linear(256, 1),
            nn.Sigmoid()  # Output between 0 and 1
        )

    def forward(self, x):
        return self.fc(x)

# Initialize models
generator = Generator()
discriminator = Discriminator()

# Load the saved model weights
generator.load_state_dict(torch.load('models/generator.pth'))
discriminator.load_state_dict(torch.load('models/discriminator.pth'))

# Set the models to evaluation mode
generator.eval()
discriminator.eval()

# User input for generating a new layout
type_of_event = input("Enter the type of event (e.g., wedding): ")
num_attendees = int(input("Enter the number of attendees: "))
seating_preferences = input("Enter seating preferences (comma-separated): ")
def create_irregular_shape(center, area):
    return {
        "center": center,
        "area": area
    }

# Generate a new layout based on the trained GAN
def generate_layout(generator, layout_size):
    z = torch.randn(1, latent_dim)  # Generate latent vector
    generated_flat_layout = generator(z).detach().numpy().flatten()

    # Ensure valid values
    generated_flat_layout = np.clip(generated_flat_layout, 0, None)  # Remove negative values
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
                "sustainability_score": generated_flat_layout[index + 3],
                "shape": create_irregular_shape((i + 0.5, j + 0.5), generated_flat_layout[index])
            }
            row.append(cell)
        generated_layout.append(row)
    return generated_layout

generated_layout = generate_layout(generator, layout_size)

# Plot the generated layout
plot_layout(generated_layout)

# Save the layout as an image
image_path = 'generated_layout.png'
plt.savefig(image_path, dpi=300)

# Upload to Cloudinary
response = cloudinary.uploader.upload(image_path)
print("Image uploaded to Cloudinary: ", response['url'])

# Print the generated layout
for row in generated_layout:
    print(row)
