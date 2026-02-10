from fastapi import APIRouter, Query
from app.services.location_service import search_all_pet_services

router = APIRouter(
    prefix="/location",
    tags=["Location Services"]
)


@router.get("/all")
def get_all_pet_services(
    lat: float = Query(..., description="Latitude"),
    lon: float = Query(..., description="Longitude")
):
    """
    Get nearby pet hospitals, shops, grooming, shelters, boarding
    """
    return search_all_pet_services(lat, lon)
