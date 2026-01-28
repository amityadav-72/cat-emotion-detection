from fastapi import APIRouter

router = APIRouter(
    prefix="/chatbot",
    tags=["Chatbot"]
)


@router.get("/ping")
def chatbot_ping():
    return {"message": "Chatbot route is working"}
