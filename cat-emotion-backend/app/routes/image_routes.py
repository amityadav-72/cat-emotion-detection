from fastapi import APIRouter, UploadFile, File, Depends
from sqlalchemy.orm import Session
from PIL import Image
import io

from app.auth_utils import get_current_user
from app.database import SessionLocal
from app.models import PredictionHistory
from app.ml.image_model import predict_image

router = APIRouter(prefix="/image", tags=["Image"])


# ---------- DB DEP ----------
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ---------- IMAGE PREDICT ----------
@router.post("/predict")
async def predict_image_emotion(
    file: UploadFile = File(...),
    current_user: str = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    contents = await file.read()
    image = Image.open(io.BytesIO(contents)).convert("RGB")

    result = predict_image(image)

    # ✅ SAVE HISTORY (THIS WAS THE MISSING PART)
    history = PredictionHistory(
        username=current_user,
        filename=file.filename,
        emotion=result["emotion"],
        confidence=round(result["confidence"], 2),
    )

    db.add(history)
    db.commit()
    db.refresh(history)

    return {
        "predicted_emotion": result["emotion"],
        "confidence": result["confidence"],
    }


# ---------- IMAGE HISTORY ----------
@router.get("/history")
def get_image_history(
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
