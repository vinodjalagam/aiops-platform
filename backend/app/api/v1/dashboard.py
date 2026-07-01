from fastapi import APIRouter

from app.kubernetes.dashboard_service import DashboardService

router = APIRouter()


@router.get("/dashboard")
async def get_dashboard():
    return await DashboardService.get_dashboard_async()
