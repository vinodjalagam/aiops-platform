from app.kubernetes.pod_service import PodService
from app.kubernetes.node_service import NodeService
from app.kubernetes.deployment_service import DeploymentService
from app.kubernetes.namespace_service import NamespaceService
from app.kubernetes.metrics_service import MetricsService
from app.kubernetes.incident_service import IncidentService
from app.kubernetes.alert_service import AlertService


class AssistantService:

    @staticmethod
    def ask(question: str):

        q = question.lower()

        if "pods" in q:
            return PodService.get_pods()

        if "nodes" in q:
            return NodeService.get_nodes()

        if "deployments" in q:
            return DeploymentService.get_deployments()

        if "namespaces" in q:
            return NamespaceService.get_namespaces()

        if "metrics" in q or "cpu" in q or "memory" in q:
            return MetricsService.get_metrics()

        if "incidents" in q:
            return IncidentService.get_incidents()

        if "alerts" in q:
            return AlertService.get_alerts()

        return {
            "message":
                "Sorry, I couldn't understand your request."
        }
