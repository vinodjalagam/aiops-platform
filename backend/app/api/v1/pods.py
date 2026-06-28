from fastapi import APIRouter
from app.kubernetes.pod_service import PodService

router = APIRouter()


@router.get("/pods")
def get_pods():
    return PodService.get_pods()
