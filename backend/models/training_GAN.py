import numpy as np
import random
import torch
import torch.nn as nn
import torch.optim as optim
import matplotlib.pyplot as plt

# Parameters
num_samples = 1000  
layout_size = 8  
latent_dim = 100  
batch_size = 32  
num_epochs = 1000  

def create_irregular_shape(center, area):
    return {
        "center": center,
        "area": area
    }

def generate_event_layout_data(num_samples=num_samples, layout_size=layout_size):
    data = []
    for _ in range(num_samples):
        layout = []
        for i in range(layout_size):
            row = []
            for j in range(layout_size):
                cell_type = "seating" if random.random() < 0.7 else "food"
                area = random.uniform(1.0, 10.0)  
                lighting_efficiency = random.uniform(0.5, 1.0)
                proximity_to_stage = random.randint(1, 3) if cell_type == "seating" else 0
                sustainability_score = random.uniform(0.0, 1.0)  
                center = (i + 0.5, j + 0.5) 
                shape = create_irregular_shape(center, area)

                row.append({
                    "cell_type": cell_type,
                    "area": area,
                    "lighting_efficiency": lighting_efficiency,
                    "proximity_to_stage": proximity_to_stage,
                    "sustainability_score": sustainability_score,
                    "shape": shape
                })
            layout.append(row)
        data.append(layout)
    return data

# Define GAN components
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

class Discriminator(nn.Module):
    def __init__(self):
        super(Discriminator, self).__init__()
        self.fc = nn.Sequential(
            nn.Linear(layout_size * layout_size * 4, 512),  
            nn.ReLU(),
            nn.Linear(512, 256),
            nn.ReLU(),
            nn.Linear(256, 1),
            nn.Sigmoid()  
        )

    def forward(self, x):
        return self.fc(x)


generator = Generator()
discriminator = Discriminator()
optimizer_G = optim.Adam(generator.parameters(), lr=0.0002, betas=(0.5, 0.999))
optimizer_D = optim.Adam(discriminator.parameters(), lr=0.0002, betas=(0.5, 0.999))

event_layout_data = generate_event_layout_data()

for epoch in range(num_epochs):
    for i in range(0, len(event_layout_data), batch_size):
       
        real_samples = []
        for j in range(batch_size):
            if i + j < len(event_layout_data):
                layout = event_layout_data[i + j]
                flat_layout = np.concatenate([np.array([cell["area"], cell["lighting_efficiency"],
                                                         cell["proximity_to_stage"],
                                                         cell["sustainability_score"]])
                                               for row in layout for cell in row])
                real_samples.append(flat_layout)

        real_samples = torch.tensor(np.array(real_samples), dtype=torch.float32)  
        input_dim = layout_size * layout_size * 4  
        if real_samples.size(1) != input_dim:
            raise ValueError(f"Expected input dimension of {input_dim}, but got {real_samples.size(1)}")

        # Train Discriminator
        optimizer_D.zero_grad()

        # Generate fake samples
        z = torch.randn(real_samples.size(0), latent_dim)  
        fake_samples = generator(z)

        real_labels = torch.ones(real_samples.size(0), 1)
        fake_labels = torch.zeros(fake_samples.size(0), 1)

        output_real = discriminator(real_samples)
        output_fake = discriminator(fake_samples.detach())

        # Calculate the discriminator loss
        loss_D = -torch.mean(torch.log(output_real) + torch.log(1 - output_fake))
        loss_D.backward()
        optimizer_D.step()

        # Train Generator
        optimizer_G.zero_grad()
        output_fake = discriminator(fake_samples)
        loss_G = -torch.mean(torch.log(output_fake))
        loss_G.backward()
        optimizer_G.step()

    if epoch % 20 == 0:
        print(f"Epoch [{epoch}/{num_epochs}] Loss D: {loss_D.item():.4f}, Loss G: {loss_G.item():.4f}")

#testing by using example
type_of_event = input("Enter the type of event (e.g., wedding): ")
num_attendees = int(input("Enter the number of attendees: "))
seating_preferences = input("Enter seating preferences (comma-separated): ")


def generate_layout(generator, layout_size):
    z = torch.randn(1, latent_dim)  # Generate latent vector
    generated_flat_layout = generator(z).detach().numpy().flatten()

 
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
#plot generated_layout to see output
