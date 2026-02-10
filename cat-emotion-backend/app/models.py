from sqlalchemy import Column, Integer, String, Float, DateTime
from datetime import datetime
from app.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)


class PredictionHistory(Base):
    __tablename__ = "prediction_history"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, index=True)
    filename = Column(String)
    emotion = Column(String)
    confidence = Column(Float)
    created_at = Column(DateTime, default=datetime.utcnow)

from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime

class CatPost(Base):
    __tablename__ = "cat_posts"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, index=True)   # reuse username (simple)
    location = Column(String, nullable=True)
    caption = Column(String, nullable=False)
    image_path = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
