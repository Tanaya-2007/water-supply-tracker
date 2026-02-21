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

@app.post("/predict")
def predict(data: dict):
    # This converts the frontend data into a format the ML model understands
    df = pd.DataFrame([data])
    prediction = model.predict(df)
    return {"prediction": int(prediction[0])}
