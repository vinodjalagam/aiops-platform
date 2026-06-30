from fastapi import APIRouter

from app.kubernetes.service_service import ServiceService

router = APIRouter()


@router.get("/services")
def get_services():
    return ServiceService.get_services()


@router.get("/services/{namespace}/{name}")
def get_service(namespace: str, name: str):
    return ServiceService.get_service(namespace, name)
