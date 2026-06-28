from pydantic import BaseModel


class DashboardResponse(BaseModel):
    nodes: int
    pods: int
    cpu: int
    memory: int
    alerts: int
    cluster_health: int