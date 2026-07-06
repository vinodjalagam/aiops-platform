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

        health = {
            "ready": False,
            "containers_ready": False,
            "initialized": False,
            "pod_scheduled": False,
            "liveness_probe": "Not Configured",
            "readiness_probe": "Not Configured",
            "startup_probe": "Not Configured",
        }

        if pod.status.conditions:

            for condition in pod.status.conditions:

                if condition.type == "Ready":
                    health["ready"] = (
                        condition.status == "True"
                    )

                elif condition.type == "ContainersReady":
                    health["containers_ready"] = (
                        condition.status == "True"
                    )

                elif condition.type == "Initialized":
                    health["initialized"] = (
                        condition.status == "True"
                    )

                elif condition.type == "PodScheduled":
                    health["pod_scheduled"] = (
                        condition.status == "True"
                    )
        for container in pod.spec.containers:

            containers.append(
                {
                    "name": container.name,
                    "image": container.image,
                    "ports": [
                        port.container_port
                        for port in (container.ports or [])
                    ],
                    "liveness_probe": (
                        container.liveness_probe is not None
                    ),
                    "readiness_probe": (
                        container.readiness_probe is not None
                    ),
                    "startup_probe": (
                        container.startup_probe is not None
                    ),
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
            "health": health,
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
    def get_pod_events(
        namespace: str,
        name: str,
    ):

        field_selector = (
            f"involvedObject.name={name},"
            f"involvedObject.namespace={namespace}"
        )

        events = core_v1.list_namespaced_event(
            namespace=namespace,
            field_selector=field_selector,
        ).items

        result = []

        for event in events:

            result.append(
                {
                    "type": event.type,
                    "reason": event.reason,
                    "message": event.message,
                    "count": event.count,
                    "first_timestamp": (
                        str(event.first_timestamp)
                        if event.first_timestamp
                        else None
                    ),
                    "last_timestamp": (
                        str(event.last_timestamp)
                        if event.last_timestamp
                        else None
                    ),
                }
            )

        result.sort(
            key=lambda x: x["last_timestamp"] or "",
            reverse=True,
        )

        return result
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
            "message": (
                f"Pod '{name}' deleted successfully."
            ),
        }
