import librosa
import numpy as np
import tensorflow_hub as hub

yamnet_model = None


def get_yamnet_model():
    global yamnet_model
    if yamnet_model is None:
        yamnet_model = hub.load("https://tfhub.dev/google/yamnet/1")
    return yamnet_model


def extract_features(audio_path):
    model = get_yamnet_model()

    y, sr = librosa.load(audio_path, sr=16000)
    y = y.astype(np.float32)

    scores, embeddings, spectrogram = model(y)
    features = np.mean(embeddings.numpy(), axis=0)

    return features.reshape(1, -1)
