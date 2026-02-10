import joblib

svm_model = joblib.load("models/yamnet_svm_model.pkl")
label_encoder = joblib.load("models/label_encoder.pkl")
