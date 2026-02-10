from pydantic import BaseModel
from datetime import datetime

# ================= AUTH =================

class UserCreate(BaseModel):
    username: str
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str


# ================= CATZONE =================

class CatPostResponse(BaseModel):
    id: int
    username: str
    location: str | None
    caption: str
    image_path: str
    created_at: datetime

    class Config:
        from_attributes = True
