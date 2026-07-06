from fastapi import APIRouter
from pydantic import BaseModel

from app.kubernetes.deployment_service import DeploymentService

router = APIRouter()


class UpdateImageRequest(BaseModel):
    image: str


class ScaleDeploymentRequest(BaseModel):
    replicas: int


@router.get("/")
def get_deployments():
    return DeploymentService.get_deployments()


@router.get("/{namespace}/{name}")
def get_deployment(namespace: str, name: str):
    return DeploymentService.get_deployment(namespace, name)


@router.patch("/{namespace}/{name}/image")
def update_image(
    namespace: str,
    name: str,
    request: UpdateImageRequest,
):
    return DeploymentService.update_image(
        namespace,
        name,
        request.image,
    )


@router.patch("/{namespace}/{name}/scale")
def scale_deployment(
    namespace: str,
    name: str,
    request: ScaleDeploymentRequest,
):
    return DeploymentService.scale_deployment(
        namespace,
        name,
        request.replicas,
    )
@router.delete("/{namespace}/{name}")
def delete_deployment(
    namespace: str,
    name: str,
):
    return DeploymentService.delete_deployment(
        namespace,
        name,
    )
