from fastapi import APIRouter
from app.kubernetes.namespace_service import NamespaceService

router = APIRouter()


@router.get("/namespaces")
def get_namespaces():
    return NamespaceService.get_namespaces()


@router.get("/namespaces/{name}")
def get_namespace(name: str):
    return NamespaceService.get_namespace(name)
