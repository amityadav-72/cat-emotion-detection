import librosa
import numpy as np
import tensorflow_hub as hub

yamnet_model = hub.load("https://tfhub.dev/google/yamnet/1")

def extract_features(audio_path):
    y, sr = librosa.load(audio_path, sr=16000)
    scores, embeddings, spectrogram = yamnet_model(y)
    features = np.mean(embeddings.numpy(), axis=0)
    return features.reshape(1, -1)
