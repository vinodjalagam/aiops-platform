from fastapi import APIRouter

from app.kubernetes.pod_service import PodService

router = APIRouter()


@router.get("/pods")
def get_pods():
    return PodService.get_pods()
#@router.get("/pods")
#def get_pods():
#    return {
#        "status": "ok"
#    }

@router.get("/pods/{namespace}/{name}")
def get_pod(
    namespace: str,
    name: str,
):
    return PodService.get_pod(
        namespace,
        name,
    )
@router.get("/pods/{namespace}/{name}/logs")
def get_pod_logs(
    namespace: str,
    name: str,
    tail_lines: int = 100,
):
    return PodService.get_pod_logs(
        namespace,
        name,
        tail_lines,
    )
@router.get("/pods/{namespace}/{name}/events")
def get_pod_events(
    namespace: str,
    name: str,
):
    return PodService.get_pod_events(
        namespace,
        name,
    )
@router.delete("/pods/{namespace}/{name}")
def delete_pod(
    namespace: str,
    name: str,
):
    return PodService.delete_pod(
        namespace,
        name,
    )
