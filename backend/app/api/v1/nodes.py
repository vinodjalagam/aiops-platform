from fastapi import APIRouter

from app.kubernetes.node_service import NodeService

router = APIRouter(
    prefix="/nodes",
    tags=["Nodes"],
)


@router.get("")
def get_nodes():
    return NodeService.get_nodes()

@router.get("/{name}")
def get_node(name: str):
    return NodeService.get_node(name)
