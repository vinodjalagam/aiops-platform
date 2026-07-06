from fastapi import APIRouter
from app.kubernetes.alert_service import AlertService

router = APIRouter()


@router.get("/alerts")
def get_alerts():
    return AlertService.get_alerts()
