from fastapi import APIRouter
from app.kubernetes.event_service import EventService

router = APIRouter()


@router.get("/events")
def get_events():
    return EventService.get_events()
