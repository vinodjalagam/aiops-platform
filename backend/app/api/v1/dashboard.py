from fastapi import APIRouter

from app.kubernetes.dashboard_service import DashboardService

router = APIRouter()


@router.get("/dashboard")
def get_dashboard():
    return DashboardService.get_dashboard()
