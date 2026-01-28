import os
import requests

GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")
GOOGLE_CLIENT_SECRET = os.getenv("GOOGLE_CLIENT_SECRET")
GOOGLE_REDIRECT_URI = os.getenv("GOOGLE_REDIRECT_URI")

GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth"
GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token"
GOOGLE_USERINFO_URL = "https://www.googleapis.com/oauth2/v2/userinfo"


def get_google_auth_url():
    return (
        f"{GOOGLE_AUTH_URL}"
        f"?client_id={GOOGLE_CLIENT_ID}"
        f"&response_type=code"
        f"&scope=openid email profile"
        f"&redirect_uri={GOOGLE_REDIRECT_URI}"
        f"&access_type=offline"
        f"&prompt=consent"
    )


def get_google_user(code: str):
    # Exchange code for access token
    token_data = {
        "client_id": GOOGLE_CLIENT_ID,
        "client_secret": GOOGLE_CLIENT_SECRET,
        "code": code,
        "grant_type": "authorization_code",
        "redirect_uri": GOOGLE_REDIRECT_URI,
    }

    token_response = requests.post(GOOGLE_TOKEN_URL, data=token_data)
    token_response.raise_for_status()

    access_token = token_response.json()["access_token"]

    # Fetch user info
    user_response = requests.get(
        GOOGLE_USERINFO_URL,
        headers={"Authorization": f"Bearer {access_token}"}
    )
    user_response.raise_for_status()

    return user_response.json()
