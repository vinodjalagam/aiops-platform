from fastapi import APIRouter

from app.kubernetes.cluster_service import ClusterService

router = APIRouter()


@router.get("/cluster")
def get_cluster():
    return ClusterService.get_cluster()
