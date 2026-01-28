from fastapi import APIRouter

router = APIRouter(
    prefix="/community",
    tags=["Community"]
)


@router.get("/ping")
def community_ping():
    return {"message": "Community route is working"}
