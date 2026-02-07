import os
from dotenv import load_dotenv

# ✅ Load environment variables FIRST
load_dotenv()

# Reduce TensorFlow logs
os.environ["TF_CPP_MIN_LOG_LEVEL"] = "2"

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

# Database
from app.database import Base, engine

# Routers
from app.routes.auth_routes import router as auth_router
from app.routes.oauth_routes import router as oauth_router
from app.routes.audio_routes import router as audio_router
from app.routes.image_routes import router as image_router
from app.routes.location_routes import router as location_router
from app.routes.chatbot_routes import router as chatbot_router
from app.routes.community_routes import router as community_router


# ✅ Create DB tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Cat Emotion Detection API",
    description="Backend API for Cat Emotion Detection",
    version="1.0.0"
)

# ✅ CORS (React / Vite)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------- STATIC FILES ----------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
UPLOADS_DIR = os.path.join(BASE_DIR, "..", "uploads")

app.mount("/uploads", StaticFiles(directory=UPLOADS_DIR), name="uploads")

# ---------- BASIC ROUTES ----------
@app.get("/")
def root():
    return {
        "status": "running",
        "message": "Cat Emotion Detection Backend is live 🚀"
    }

@app.get("/health")
def health():
    return {"ok": True}

# ---------- ROUTERS ----------
app.include_router(auth_router)
app.include_router(oauth_router)
app.include_router(audio_router)
app.include_router(image_router)
app.include_router(location_router)
app.include_router(chatbot_router)
app.include_router(community_router)
