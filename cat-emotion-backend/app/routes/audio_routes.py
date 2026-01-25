import os
import shutil
import numpy as np
from fastapi import APIRouter, UploadFile, File, Depends
from sqlalchemy.orm import Session

from app.ml.yamnet import extract_features
from app.ml.load_model import svm_model, label_encoder
from app.auth import get_current_user
from app.database import SessionLocal
from app.models import PredictionHistory

router = APIRouter(prefix="/audio", tags=["Audio"])


# ---------- DB DEPENDENCY ----------
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ---------- SOFTMAX FOR CONFIDENCE ----------
def softmax(x):
    e_x = np.exp(x - np.max(x))
    return e_x / e_x.sum(axis=1, keepdims=True)


# ---------- PREDICT + SAVE HISTORY ----------
@router.post("/predict")
async def predict_audio(
    file: UploadFile = File(...),
    current_user: str = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    temp_file = f"temp_{file.filename}"

    with open(temp_file, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    features = extract_features(temp_file)

    decision_scores = svm_model.decision_function(features)
    probabilities = softmax(decision_scores)
    confidence = float(np.max(probabilities))

    prediction = svm_model.predict(features)
    emotion = label_encoder.inverse_transform(prediction)[0]

    os.remove(temp_file)

    # SAVE HISTORY
    history = PredictionHistory(
        username=current_user,
        filename=file.filename,
        emotion=emotion,
        confidence=confidence,
    )
    db.add(history)
    db.commit()

    return {
        "filename": file.filename,
        "predicted_emotion": emotion,
        "confidence": round(confidence, 2),
    }


# ---------- GET HISTORY ----------
@router.get("/history")
def get_prediction_history(
    current_user: str = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    history = (
        db.query(PredictionHistory)
        .filter(PredictionHistory.username == current_user)
        .order_by(PredictionHistory.created_at.desc())
        .all()
    )

    return [
        {
            "filename": h.filename,
            "emotion": h.emotion,
            "confidence": h.confidence,
            "timestamp": h.created_at,
        }
        for h in history
    ]
