# 🐱 Cat Emotion Detection System

A full-stack Machine Learning web application that detects **cat emotions from audio signals** using a trained ML model.

---

## 🚀 Features

- 🔐 User Authentication (Login & Register)
- 🎧 Upload cat audio files
- 🤖 Predict cat emotion using ML model
- 📊 Confidence score for predictions
- 🚪 Secure logout
- 💻 Clean & professional UI (React + Vite)
- ⚡ FastAPI backend

---

## 🛠 Tech Stack

### Frontend
- React (Vite)
- JavaScript
- CSS (custom UI)
- Fetch API

### Backend
- FastAPI
- Python
- JWT Authentication
- Machine Learning model (`.pkl`)
- Audio processing (Librosa / YAMNet)

---

## 📂 Project Structure

```
project-root/
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Predict.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── backend/
│   ├── app/
│   ├── models/
│   ├── requirements.txt
│   └── main.py
│
├── .gitignore
└── README.md
```

---

## ▶️ How to Run the Project

### 🔹 Backend

```bash
cd backend
pip install -r requirements.txt
python -m uvicorn app.main:app --reload
```

Backend will run at:
```
http://127.0.0.1:8000
```

---

### 🔹 Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend will run at:
```
http://localhost:5173
```

---

## 📥 Supported Audio Formats

- `.wav`
- `.mp3`
- `.mpeg`
- `.mpga`
- `.m4a`
- `.aac`
- `.ogg`
- `.flac`
- `.webm`

---

## 🔐 Authentication Flow

1. Register a new user
2. Login with credentials
3. Upload audio file
4. Get predicted emotion + confidence
5. Logout securely

---

## 🧠 ML Model

- Uses a pre-trained audio feature extractor
- Emotion classification via trained ML model
- Model loaded from `.pkl` file

---

## 📌 Future Enhancements

- 📜 Prediction history
- 📊 Confidence visualization bar
- 👤 User dashboard
- ☁️ Cloud deployment
- 🐾 Multi-animal emotion support

---

## 👨‍💻 Author

Developed by **Amit Kumar Yadav**  
🎓 Computer Science & Engineering  
🚀 AI | ML | Full-Stack Development

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!
