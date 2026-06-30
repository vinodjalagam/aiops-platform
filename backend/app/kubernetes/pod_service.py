from app.kubernetes.client import core_v1


class PodService:

    @staticmethod
    def get_pods():

        pods = core_v1.list_pod_for_all_namespaces().items

        result = []

        for pod in pods:

            result.append(
                {
                    "name": pod.metadata.name,
                    "namespace": pod.metadata.namespace,
                    "status": pod.status.phase,
                    "node": pod.spec.node_name,
                }
            )

        return result

    @staticmethod
    def get_pod(
        namespace: str,
        name: str,
    ):

        pod = core_v1.read_namespaced_pod(
            name=name,
            namespace=namespace,
        )

        restart_count = 0

        if pod.status.container_statuses:

            for container in pod.status.container_statuses:
                restart_count += container.restart_count

        containers = []

        for container in pod.spec.containers:

            containers.append(
                {
                    "name": container.name,
                    "image": container.image,
                    "ports": [
                        port.container_port
                        for port in (container.ports or [])
                    ],
                }
            )

        conditions = []

        if pod.status.conditions:

            for condition in pod.status.conditions:

                conditions.append(
                    {
                        "type": condition.type,
                        "status": condition.status,
                    }
                )

        return {
            "name": pod.metadata.name,
            "namespace": pod.metadata.namespace,
            "status": pod.status.phase,
            "node": pod.spec.node_name,
            "pod_ip": pod.status.pod_ip,
            "host_ip": pod.status.host_ip,
            "qos_class": pod.status.qos_class,
            "restart_count": restart_count,
            "containers": containers,
            "conditions": conditions,
        }
    @staticmethod
    def get_pod_logs(
        namespace: str,
        name: str,
        tail_lines: int = 100,
    ):

        logs = core_v1.read_namespaced_pod_log(
            name=name,
            namespace=namespace,
            tail_lines=tail_lines,
            timestamps=True,
        )

        return {
            "logs": logs,
        }
    @staticmethod
    def delete_pod(
        namespace: str,
        name: str,
    ):

        core_v1.delete_namespaced_pod(
            name=name,
            namespace=namespace,
        )

        return {
            "status": "success",
            "message": f"Pod '{name}' deleted successfully.",
        }
