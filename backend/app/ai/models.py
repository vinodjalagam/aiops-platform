from pydantic import BaseModel, Field


class DiagnosisContext(BaseModel):

    resource: str
    name: str
    namespace: str

    phase: str | None = None
    node: str | None = None

    events: list = Field(default_factory=list)
    conditions: list = Field(default_factory=list)
    metrics: dict = Field(default_factory=dict)
    logs: list = Field(default_factory=list)
    labels: dict = Field(default_factory=dict)
    annotations: dict = Field(default_factory=dict)
