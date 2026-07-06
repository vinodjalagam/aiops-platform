from fastapi import APIRouter

from app.kubernetes.incident_service import IncidentService

router = APIRouter()


@router.get("/incidents")
def get_incidents():
    return IncidentService.get_incidents()
