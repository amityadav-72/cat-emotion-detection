from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import Base, engine
from app.routes.auth_routes import router as auth_router
from app.routes.audio_routes import router as audio_router

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Cat Emotion Detection API")

# ✅ CORS CONFIG (THIS IS THE KEY)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(audio_router)
