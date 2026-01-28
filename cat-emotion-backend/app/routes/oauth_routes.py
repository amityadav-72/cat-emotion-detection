from fastapi import APIRouter
from fastapi.responses import RedirectResponse
from app.auth.oauth import get_google_auth_url, get_google_user

router = APIRouter(
    prefix="/oauth",
    tags=["OAuth"]
)


@router.get("/google/login")
def google_login():
    """
    Redirect user to Google OAuth
    """
    return RedirectResponse(get_google_auth_url())


@router.get("/google/callback")
def google_callback(code: str):
    """
    Google redirects here after login
    """
    user = get_google_user(code)

    return {
        "message": "Google OAuth successful",
        "user": {
            "email": user.get("email"),
            "name": user.get("name"),
            "picture": user.get("picture")
        }
    }
