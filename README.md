# 🐱 MeowMood -- Cat Emotion Detection & Community Platform

MeowMood is a **production‑ready, full‑stack AI web application** built
for cat owners and pet enthusiasts.\
It combines **Machine Learning**, **Generative AI**, and **modern web
technologies** to understand cat emotions, assist owners with AI
guidance, and build a social community around cats.

------------------------------------------------------------------------

## 📌 What Problem Does MeowMood Solve?

Cat owners often struggle to: - Understand their cat's emotions -
Interpret unusual behaviors - Find reliable nearby pet services - Get
trustworthy cat‑specific advice online

👉 **MeowMood solves this using AI + community + location services** in
one platform.

------------------------------------------------------------------------

## 🚀 Core Features (Detailed)

### 🧠 1. Cat Emotion Detection (Image & Audio)

-   Upload **cat images or audio recordings**
-   ML models analyze:
    -   Facial expressions
    -   Vocal patterns
-   Output:
    -   Emotion label (Happy, Calm, Angry, Fearful, etc.)
    -   Confidence score (%)
-   Emotion history stored per user
-   Visualized with charts on dashboard

------------------------------------------------------------------------

### 🤖 2. AI Cat Assistant (Google Gemini)

-   Powered by **Google Gemini API**
-   Chatbot is **strictly restricted to cat‑related queries**
-   Capabilities:
    -   Explain cat behavior
    -   Interpret detected emotions
    -   Provide care & health tips
-   Security:
    -   Rejects unrelated or general AI questions
    -   Prevents misuse

------------------------------------------------------------------------

### 🐾 3. CatZone -- Community Feed

-   Instagram‑like feed for cat lovers
-   Users can:
    -   Upload cat photos
    -   Add captions
    -   View posts from other users
-   Local image storage (server‑side)
-   Authorization rules:
    -   Only post owner can delete
    -   JWT‑secured endpoints

------------------------------------------------------------------------

### 📍 4. Nearby Pet Services

-   Location‑based service finder
-   Shows nearby:
    -   Veterinary clinics
    -   Pet shops
    -   Animal hospitals
-   Integrated map visualization
-   Distance‑based listing

------------------------------------------------------------------------

### 🔐 5. Authentication & Security

-   Authentication methods:
    -   Username + password
    -   Google OAuth
-   JWT‑based session management
-   Secure API access
-   `.env` for secrets (never exposed)

------------------------------------------------------------------------

## 🛠️ Complete Tech Stack

### Frontend

-   React (Vite)
-   HTML5, CSS3
-   Fetch API
-   Responsive UI

### Backend

-   FastAPI
-   SQLAlchemy ORM
-   SQLite database
-   JWT Authentication
-   Google Gemini API

### AI / ML

-   TensorFlow (image models)
-   PyTorch (audio models)
-   Scikit‑learn
-   Librosa (audio processing)

------------------------------------------------------------------------

## 📁 Complete Project Structure (Detailed)

    cat-emotion-detection/
    │
    ├── README.md                 # Project documentation
    ├── LICENSE                   # MIT License
    ├── package-lock.json         # Frontend dependency lock file
    │
    ├── cat-emotion-frontend/     # React frontend
    │   ├── index.html            # App entry HTML
    │   ├── package.json          # Frontend dependencies
    │   ├── vite.config.js        # Vite configuration
    │   │
    │   ├── src/
    │   │   ├── main.jsx          # React DOM entry
    │   │   ├── App.jsx           # Root component
    │   │   ├── App.css           # Global styles
    │   │   ├── index.css         # Base CSS
    │   │   │
    │   │   ├── assets/           # Static assets
    │   │   │   ├── cat-image.png
    │   │   │   └── react.svg
    │   │   │
    │   │   ├── auth/             # Authentication UI
    │   │   │   ├── Login.jsx
    │   │   │   ├── Register.jsx
    │   │   │   └── OAuthLogin.jsx
    │   │   │
    │   │   ├── components/       # Reusable UI components
    │   │   │   ├── Navbar.jsx
    │   │   │   ├── Footer.jsx
    │   │   │   ├── Chatbot.jsx
    │   │   │   ├── CatZone.jsx
    │   │   │   ├── EmotionCards.jsx
    │   │   │   └── Charts.jsx
    │   │   │
    │   │   ├── pages/            # App pages
    │   │   │   ├── Landing.jsx
    │   │   │   ├── Dashboard.jsx
    │   │   │   ├── Predict.jsx
    │   │   │   ├── History.jsx
    │   │   │   ├── NearbyServices.jsx
    │   │   │   ├── Chatbot.jsx
    │   │   │   └── CatZone.jsx
    │   │   │
    │   │   └── services/         # API handlers
    │   │       ├── api.js
    │   │       └── historyService.js
    │
    ├── cat-emotion-backend/      # FastAPI backend
    │   ├── app/
    │   │   ├── main.py           # App entry point
    │   │   ├── database.py       # DB connection
    │   │   ├── models.py         # SQLAlchemy models
    │   │   ├── schemas.py        # Pydantic schemas
    │   │   │
    │   │   ├── routes/           # API routes
    │   │   │   ├── auth_routes.py
    │   │   │   ├── oauth_routes.py
    │   │   │   ├── image_routes.py
    │   │   │   ├── audio_routes.py
    │   │   │   ├── chatbot_routes.py
    │   │   │   ├── location_routes.py
    │   │   │   └── community_routes.py
    │   │
    │   ├── uploads/              # User uploads
    │   │   └── cats/
    │   │
    │   ├── requirements.txt      # Python dependencies
    │   └── .env                  # Environment variables

------------------------------------------------------------------------

## ⚙️ Backend Setup (Step‑by‑Step)

``` bash
cd cat-emotion-backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```

Create `.env` file:

    GEMINI_API_KEY=your_api_key_here
    SECRET_KEY=your_jwt_secret

Run server:

``` bash
uvicorn app.main:app --reload
```

Backend URL:\
- http://127.0.0.1:8000\

Swagger Docs:\
- http://127.0.0.1:8000/docs

------------------------------------------------------------------------

## 🌐 Frontend Setup

``` bash
cd cat-emotion-frontend
npm install
npm run dev
```

Frontend URL:\
- http://localhost:5173

------------------------------------------------------------------------

## 🔗 Important API Endpoints

### 🧠 Emotion Detection

-   POST `/image/predict`
-   POST `/audio/predict`

### 🤖 Chatbot

-   POST `/chatbot/chat`

### 🐾 Community

-   GET `/community/catzone/posts`
-   POST `/community/catzone/post`
-   DELETE `/community/catzone/post/{id}`

------------------------------------------------------------------------

## 🔐 Security Best Practices

-   `.env` ignored via `.gitignore`
-   JWT authentication everywhere
-   CORS restricted
-   API keys never exposed

------------------------------------------------------------------------

## 🚧 Future Enhancements

-   Likes & comments
-   User profiles
-   Cloud image storage (AWS S3)
-   Notifications
-   Production deployment
-   Improved ML accuracy

------------------------------------------------------------------------

## 👨‍💻 Author

**Amit Kumar Yadav**  
Computer Science & Engineering  
AI | ML | Full-Stack | Cloud  
Founder – Logic Loopers Community  

🔗 **GitHub:** [amityadav-72](https://github.com/amityadav-72)  
🔗 **LinkedIn:** [Amit Kumar Yadav](https://www.linkedin.com/in/amityadav72)  


------------------------------------------------------------------------

## ⭐ Support

If you like this project: - ⭐ Star the repository - 🍴 Fork it - 🐛
Raise issues - 💡 Suggest improvements
