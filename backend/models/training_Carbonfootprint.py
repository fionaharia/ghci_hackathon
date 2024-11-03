import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
df = pd.read_csv('carbon_footprint_data.csv')
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score
X = df[['travel_distance', 'materials_used']]
X = pd.get_dummies(df, columns=['mode_of_transport', 'catering_type'], drop_first=True)
y = df['carbon_footprint']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
model = LinearRegression()
model.fit(X_train, y_train)
y_pred = model.predict(X_test)

mse = mean_squared_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)

print(f'Mean Squared Error: {mse}')
print(f'R^2 Score: {r2}')

