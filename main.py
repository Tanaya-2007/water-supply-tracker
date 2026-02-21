from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import pandas as pd

app = FastAPI()

# Loading the brain of the model
model = joblib.load('water_model.joblib')
encoder = joblib.load('zone_encoder.joblib')

class WaterData(BaseModel):
    zone: str
    hour: int
    day: int
    temp: float

@app.post("/predict")
def predict_delay(data: WaterData):
    zone_num = encoder.transform([data.zone])[0]
    input_df = pd.DataFrame([[zone_num, data.hour, data.day, data.temp]], 
                            columns=['Zone_ID', 'Hour_of_Day', 'Day_of_Week', 'Temperature'])
    prediction = model.predict(input_df)[0]
    return {"delay_minutes": round(prediction, 2)}
