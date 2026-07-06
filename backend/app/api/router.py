from fastapi import APIRouter
from app.api.v1.metrics import router as metrics_router
from app.api.v1.dashboard import router as dashboard_router
from app.api.v1.nodes import router as node_router
from app.api.v1.pods import router as pod_router
from app.api.v1.deployments import router as deployment_router
from app.api.v1.services import router as service_router
from app.api.v1.namespaces import router as namespace_router
from app.api.v1.cluster import router as cluster_router
from app.api.v1.logs import router as logs_router
from app.api.v1.incidents import router as incidents_router
from app.api.v1.alerts import router as alerts_router
from app.api.v1.assistant import router as assistant_router
api_router = APIRouter(prefix="/api/v1")
api_router.include_router(metrics_router)
api_router.include_router(dashboard_router)
api_router.include_router(logs_router)
api_router.include_router(node_router)
api_router.include_router(assistant_router)
api_router.include_router(pod_router)
api_router.include_router(cluster_router)
api_router.include_router(service_router)
api_router.include_router(incidents_router)
api_router.include_router(
    namespace_router,
    tags=["Namespaces"],
)

api_router.include_router(
    deployment_router,
    prefix="/deployments",
    tags=["Deployments"],
)
api_router.include_router(alerts_router)

