from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import firebase_admin
from firebase_admin import credentials, auth
from pathlib import Path

# -------------------------------------------------
# FIREBASE INITIALIZATION (SAFE & STABLE)
# -------------------------------------------------

BASE_DIR = Path(__file__).resolve().parent.parent
FIREBASE_CRED_PATH = BASE_DIR / "firebase_service_account.json"

if not FIREBASE_CRED_PATH.exists():
    raise RuntimeError(
        f"Firebase service account file not found at: {FIREBASE_CRED_PATH}"
    )

cred = credentials.Certificate(str(FIREBASE_CRED_PATH))

# Prevent re-init during reload
if not firebase_admin._apps:
    firebase_admin.initialize_app(cred)

# -------------------------------------------------
# SECURITY (Swagger + API)
# -------------------------------------------------

security = HTTPBearer()

# -------------------------------------------------
# AUTH DEPENDENCY (🔥 UID ONLY 🔥)
# -------------------------------------------------

def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
) -> str:
    """
    Verifies Firebase ID token and returns ONLY Firebase UID.
    UID is stable and must be used for DB storage.
    """
    try:
        token = credentials.credentials
        decoded_token = auth.verify_id_token(token)

        uid = decoded_token.get("uid")

        if not uid:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid Firebase token",
            )

        return uid  # ✅ ALWAYS UID

    except Exception as e:
        print("🔥 Firebase Auth Error:", e)
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired Firebase token",
        )
