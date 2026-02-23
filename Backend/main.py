from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import joblib
import pandas as pd

app = FastAPI()

# Allow the frontend to talk to this backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load your models (Make sure these files are uploaded to the same folder!)
model = joblib.load("water_model.joblib")
encoder = joblib.load("zone_encoder.joblib")

@app.get("/")
def home():
    return {"message": "Water Supply Prediction API is Running"}

import datetime

@app.post("/predict")
def predict(data: dict):
    # 1. Get current day of the week (0=Monday, 6=Sunday)
    current_day = datetime.datetime.now().weekday()
    
    # 2. Map frontend data to the EXACT column names used during training
    input_data = {
        "Day_of_Week": [current_day],
        "Hour_of_Day": [data.get("hour")],
        "Temperature": [data.get("temperature")],
        "Zone_ID": [data.get("zone")]
    }
    
    # 3. Create DataFrame and get prediction
    df = pd.DataFrame(input_data)
    prediction = model.predict(df)
    
    return {"prediction": int(prediction[0])}

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"], # Allows your React app to connect
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
