from fastapi import APIRouter
from pydantic import BaseModel

from app.kubernetes.deployment_service import DeploymentService

router = APIRouter()


class UpdateImageRequest(BaseModel):
    image: str


class ScaleDeploymentRequest(BaseModel):
    replicas: int


@router.get("/")
async def get_deployments():
    return await DeploymentService.get_deployments_async()


@router.get("/{namespace}/{name}")
async def get_deployment(namespace: str, name: str):
    return await DeploymentService.get_deployment_async(namespace, name)


@router.patch("/{namespace}/{name}/image")
async def update_image(
    namespace: str,
    name: str,
    request: UpdateImageRequest,
):
    return await DeploymentService.update_image_async(
        namespace,
        name,
        request.image,
    )


@router.patch("/{namespace}/{name}/scale")
async def scale_deployment(
    namespace: str,
    name: str,
    request: ScaleDeploymentRequest,
):
    return await DeploymentService.scale_deployment_async(
        namespace,
        name,
        request.replicas,
    )
@router.delete("/{namespace}/{name}")
async def delete_deployment(
    namespace: str,
    name: str,
):
    return await DeploymentService.delete_deployment_async(
        namespace,
        name,
    )
