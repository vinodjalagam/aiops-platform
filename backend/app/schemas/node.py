from pydantic import BaseModel


class NodeResponse(BaseModel):
    name: str
    status: str
    role: str
    version: str