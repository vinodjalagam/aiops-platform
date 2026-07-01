from fastapi import APIRouter

from app.kubernetes.pod_service import PodService

router = APIRouter()


@router.get("/pods")
async def get_pods():
    return await PodService.get_pods_async()

@router.get("/pods/{namespace}/{name}")
async def get_pod(
    namespace: str,
    name: str,
):
    return await PodService.get_pod_async(
        namespace,
        name,
    )
@router.get("/pods/{namespace}/{name}/logs")
async def get_pod_logs(
    namespace: str,
    name: str,
    tail_lines: int = 100,
):
    return await PodService.get_pod_logs_async(
        namespace,
        name,
        tail_lines,
    )
@router.get("/pods/{namespace}/{name}/events")
async def get_pod_events(
    namespace: str,
    name: str,
):
    return await PodService.get_pod_events_async(
        namespace,
        name,
    )
@router.delete("/pods/{namespace}/{name}")
async def delete_pod(
    namespace: str,
    name: str,
):
    return await PodService.delete_pod_async(
        namespace,
        name,
    )
