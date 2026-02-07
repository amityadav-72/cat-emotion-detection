import os
import re
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from dotenv import load_dotenv
import google.generativeai as genai

# ---------------- LOAD ENV ----------------
load_dotenv()

API_KEY = os.getenv("GEMINI_API_KEY")
if not API_KEY:
    raise RuntimeError("GEMINI_API_KEY not found in .env")

# ---------------- CONFIGURE GEMINI ----------------
genai.configure(api_key=API_KEY)

MODEL_NAME = "models/gemini-flash-lite-latest"
model = genai.GenerativeModel(MODEL_NAME)

router = APIRouter(
    prefix="/chatbot",
    tags=["Chatbot"]
)

# ---------------- SYSTEM PROMPT ----------------
SYSTEM_PROMPT = """
You are CatCare AI 🐱.

You ONLY help with cats.

STRICT RULES:
- If question is NOT about cats, reply EXACTLY:
  "I can only help with cat-related questions 🐾 Please ask something about cats."

- Always answer in numbered points (1., 2., 3., etc.)
- Maximum 5 points
- Each point must be ONE short sentence
- No paragraphs
- No asterisks (*)
- Simple language
"""

# ---------------- SCHEMA ----------------
class ChatRequest(BaseModel):
    message: str

# ---------------- FORMATTER ----------------
def format_points(text: str) -> str:
    """
    Converts Gemini output into clean bullet points
    """
    # Remove extra newlines
    text = text.replace("\n", " ")

    # Split by numbered points or asterisks
    points = re.split(r"\d+\.\s|\*\s", text)
    points = [p.strip() for p in points if p.strip()]

    # Limit to 5 points
    points = points[:5]

    return "\n".join([f"• {p}" for p in points])

# ---------------- ROUTES ----------------
@router.get("/ping")
def chatbot_ping():
    return {"message": "Gemini CatCare chatbot is working 🐱"}

@router.post("/chat")
def chat_with_gemini(payload: ChatRequest):
    try:
        prompt = f"""
{SYSTEM_PROMPT}

User question:
{payload.message}

Answer:
"""

        response = model.generate_content(prompt)

        if not response or not response.text:
            raise ValueError("Empty response from Gemini")

        clean_reply = format_points(response.text)

        return {"reply": clean_reply}

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Gemini error: {str(e)}"
        )
