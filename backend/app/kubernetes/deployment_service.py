from app.kubernetes.client import apps_v1


class DeploymentService:

    @staticmethod
    def get_deployments():

        deployments = apps_v1.list_deployment_for_all_namespaces().items

        result = []

        for deployment in deployments:

            result.append(
                {
                    "name": deployment.metadata.name,
                    "namespace": deployment.metadata.namespace,
                    "replicas": deployment.spec.replicas,
                    "ready_replicas": deployment.status.ready_replicas or 0,
                    "available_replicas": deployment.status.available_replicas or 0,
                    "updated_replicas": deployment.status.updated_replicas or 0,
                    "strategy": deployment.spec.strategy.type,
                }
            )

        return result

    @staticmethod
    def get_deployment(namespace: str, name: str):

        deployment = apps_v1.read_namespaced_deployment(
            name=name,
            namespace=namespace,
        )

        return {
            "name": deployment.metadata.name,
            "namespace": deployment.metadata.namespace,
            "replicas": deployment.spec.replicas,
            "ready_replicas": deployment.status.ready_replicas or 0,
            "available_replicas": deployment.status.available_replicas or 0,
            "updated_replicas": deployment.status.updated_replicas or 0,
            "strategy": deployment.spec.strategy.type,
            "labels": deployment.metadata.labels or {},
            "selector": deployment.spec.selector.match_labels or {},
            "containers": [
                {
                    "name": container.name,
                    "image": container.image,
                    "ports": [
                        port.container_port
                        for port in (container.ports or [])
                    ],
                }
                for container in deployment.spec.template.spec.containers
            ],
        }

    @staticmethod
    def update_image(
        namespace: str,
        name: str,
        image: str,
    ):

        deployment = apps_v1.read_namespaced_deployment(
            name=name,
            namespace=namespace,
        )

        # Update image for every container
        for container in deployment.spec.template.spec.containers:
            container.image = image

        apps_v1.patch_namespaced_deployment(
            name=name,
            namespace=namespace,
            body=deployment,
        )

        return {
            "status": "success",
            "message": f"Deployment '{name}' image updated successfully.",
            "image": image,
        }
    @staticmethod
    def scale_deployment(
        namespace: str,
        name: str,
        replicas: int,
    ):

        deployment = apps_v1.read_namespaced_deployment(
            name=name,
            namespace=namespace,
        )

        deployment.spec.replicas = replicas

        apps_v1.patch_namespaced_deployment(
            name=name,
            namespace=namespace,
            body=deployment,
        )

        return {
            "status": "success",
            "message": f"Deployment '{name}' scaled successfully.",
            "replicas": replicas,
        }
    @staticmethod
    def delete_deployment(
        namespace: str,
        name: str,
    ):

        apps_v1.delete_namespaced_deployment(
            name=name,
            namespace=namespace,
        )

        return {
            "status": "success",
            "message": f"Deployment '{name}' deleted successfully.",
        }
