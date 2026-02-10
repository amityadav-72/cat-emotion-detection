import os
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()

print("API KEY FOUND:", bool(os.getenv("GEMINI_API_KEY")))

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

print("\nAVAILABLE MODELS:\n")

for m in genai.list_models():
    if "generateContent" in m.supported_generation_methods:
        print(m.name)
