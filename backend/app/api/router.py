from fastapi import APIRouter

from app.api.v1.dashboard import router as dashboard_router
from app.api.v1.nodes import router as node_router

api_router = APIRouter(prefix="/api/v1")

api_router.include_router(dashboard_router)
api_router.include_router(node_router)