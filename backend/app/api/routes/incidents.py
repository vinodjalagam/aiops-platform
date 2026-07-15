from fastapi import APIRouter

from app.incidents.incident_service import IncidentService

router = APIRouter()

@router.get("")
def get_incidents():

    return IncidentService.get_all()
