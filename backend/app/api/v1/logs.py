from fastapi import APIRouter

from app.kubernetes.logs_service import LogsService

router = APIRouter()


@router.get("/pods/{namespace}/{pod_name}/logs")
def get_pod_logs(
    namespace: str,
    pod_name: str,
    tail_lines: int = 100,
):
    return LogsService.get_logs(
        namespace,
        pod_name,
        tail_lines,
    )
