import os
import shutil
import uuid
from fastapi import APIRouter, Depends, UploadFile, File, Form
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import CatPost
from app.schemas import CatPostResponse

router = APIRouter(
    prefix="/community",
    tags=["Community"]
)

# ================= UPLOAD CONFIG =================
UPLOAD_DIR = "uploads/cats"
os.makedirs(UPLOAD_DIR, exist_ok=True)

# ================= TEST ROUTE =================
@router.get("/ping")
def community_ping():
    return {"message": "Community route is working"}

# ================= CREATE CAT POST =================
@router.post("/catzone/post", response_model=CatPostResponse)
async def create_cat_post(
    username: str = Form(...),
    caption: str = Form(...),
    location: str = Form(None),
    image: UploadFile = File(...),
    db: Session = Depends(get_db),
):
    # -------- SAFE FILENAME (NO SPACES / SPECIAL CHARS) --------
    ext = image.filename.split(".")[-1]
    filename = f"{uuid.uuid4().hex}.{ext}"

    file_path = os.path.join(UPLOAD_DIR, filename)

    # Save image locally
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(image.file, buffer)

    # Browser-safe path (VERY IMPORTANT)
    image_path = f"uploads/cats/{filename}"

    # Save DB record
    post = CatPost(
        username=username,
        caption=caption,
        location=location,
        image_path=image_path,
    )

    db.add(post)
    db.commit()
    db.refresh(post)

    return post

# ================= GET CATZONE FEED =================
@router.get("/catzone/posts", response_model=list[CatPostResponse])
def get_cat_posts(db: Session = Depends(get_db)):
    return (
        db.query(CatPost)
        .order_by(CatPost.created_at.desc())
        .all()
    )

@router.delete("/catzone/post/{post_id}")
def delete_cat_post(post_id: int, db: Session = Depends(get_db)):
    post = db.query(CatPost).filter(CatPost.id == post_id).first()

    if not post:
        return {"error": "Post not found"}

    # delete image file
    if post.image_path and os.path.exists(post.image_path):
        os.remove(post.image_path)

    db.delete(post)
    db.commit()

    return {"message": "Post deleted successfully"}
