import os
os.environ["TF_CPP_MIN_LOG_LEVEL"] = "2"

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# database
from app.database import Base, engine

# routers
from app.routes.auth_routes import router as auth_router
from app.routes.audio_routes import router as audio_router


# create database tables
Base.metadata.create_all(bind=engine)


app = FastAPI(
    title="Cat Emotion Detection API",
    description="Backend API for Cat Emotion Detection",
    version="1.0.0"
)


# CORS configuration (Vite + React)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# root route (fixes Not Found)
@app.get("/")
def root():
    return {
        "status": "running",
        "message": "Cat Emotion Detection Backend is live 🚀"
    }


# health check
@app.get("/health")
def health():
    return {"ok": True}


# include routers
app.include_router(auth_router)
app.include_router(audio_router)
