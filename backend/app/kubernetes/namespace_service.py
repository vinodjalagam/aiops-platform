from app.kubernetes.client import core_v1, apps_v1


class NamespaceService:

    @staticmethod
    def get_namespaces():

        namespaces = core_v1.list_namespace().items

        result = []

        for namespace in namespaces:

            pod_count = len(
                core_v1.list_namespaced_pod(
                    namespace.metadata.name
                ).items
            )

            service_count = len(
                core_v1.list_namespaced_service(
                    namespace.metadata.name
                ).items
            )

            deployment_count = len(
                apps_v1.list_namespaced_deployment(
                    namespace.metadata.name
                ).items
            )

            result.append(
                {
                    "name": namespace.metadata.name,
                    "status": namespace.status.phase,
                    "pods": pod_count,
                    "services": service_count,
                    "deployments": deployment_count,
                    "age": str(namespace.metadata.creation_timestamp),
                }
            )

        return result

    @staticmethod
    def get_namespace(name: str):

        namespace = core_v1.read_namespace(name)

        pods = core_v1.list_namespaced_pod(name).items

        services = core_v1.list_namespaced_service(name).items

        deployments = apps_v1.list_namespaced_deployment(
            name
        ).items

        events = core_v1.list_namespaced_event(name).items

        return {

            "name": namespace.metadata.name,

            "status": namespace.status.phase,

            "age": str(namespace.metadata.creation_timestamp),

            "pods": [
                {
                    "name": pod.metadata.name,
                    "status": pod.status.phase,
                    "node": pod.spec.node_name,
                }
                for pod in pods
            ],

            "services": [
                {
                    "name": service.metadata.name,
                    "type": service.spec.type,
                }
                for service in services
            ],

            "deployments": [
                {
                    "name": deployment.metadata.name,
                    "replicas": deployment.spec.replicas,
                    "ready": deployment.status.ready_replicas or 0,
                }
                for deployment in deployments
            ],

            "events": [
                {
                    "reason": event.reason,
                    "message": event.message,
                    "type": event.type,
                }
                for event in events[-10:]
            ],
        }
