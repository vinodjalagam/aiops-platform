from app.kubernetes.client import apps_v1, async_apps_v1
from app.utils.cache import cached, deployments_cache
import asyncio


class DeploymentService:

    @staticmethod
    @cached(deployments_cache, "deployments")
    async def get_deployments_async():
        deployments = (await async_apps_v1.list_deployment_for_all_namespaces()).items

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
    def get_deployments():
        """Synchronous wrapper for backward compatibility"""
        return asyncio.run(DeploymentService.get_deployments_async())

    @staticmethod
    async def get_deployment_async(namespace: str, name: str):
        deployment = await async_apps_v1.read_namespaced_deployment(
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
    def get_deployment(namespace: str, name: str):
        """Synchronous wrapper for backward compatibility"""
        return asyncio.run(DeploymentService.get_deployment_async(namespace, name))

    @staticmethod
    async def update_image_async(
        namespace: str,
        name: str,
        image: str,
    ):
        deployment = await async_apps_v1.read_namespaced_deployment(
            name=name,
            namespace=namespace,
        )

        # Update image for every container
        for container in deployment.spec.template.spec.containers:
            container.image = image

        await async_apps_v1.patch_namespaced_deployment(
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
    def update_image(
        namespace: str,
        name: str,
        image: str,
    ):
        """Synchronous wrapper for backward compatibility"""
        return asyncio.run(DeploymentService.update_image_async(namespace, name, image))

    @staticmethod
    async def scale_deployment_async(
        namespace: str,
        name: str,
        replicas: int,
    ):
        deployment = await async_apps_v1.read_namespaced_deployment(
            name=name,
            namespace=namespace,
        )

        deployment.spec.replicas = replicas

        await async_apps_v1.patch_namespaced_deployment(
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
    def scale_deployment(
        namespace: str,
        name: str,
        replicas: int,
    ):
        """Synchronous wrapper for backward compatibility"""
        return asyncio.run(DeploymentService.scale_deployment_async(namespace, name, replicas))

    @staticmethod
    async def delete_deployment_async(
        namespace: str,
        name: str,
    ):
        await async_apps_v1.delete_namespaced_deployment(
            name=name,
            namespace=namespace,
        )

        return {
            "status": "success",
            "message": f"Deployment '{name}' deleted successfully.",
        }

    @staticmethod
    def delete_deployment(
        namespace: str,
        name: str,
    ):
        """Synchronous wrapper for backward compatibility"""
        return asyncio.run(DeploymentService.delete_deployment_async(namespace, name))
