from app.kubernetes.client import core_v1


class IncidentService:

    @staticmethod
    def get_incidents():

        incidents = []

        pods = core_v1.list_pod_for_all_namespaces().items

        for pod in pods:

            namespace = pod.metadata.namespace
            pod_name = pod.metadata.name

            # Pending Pods
            if pod.status.phase == "Pending":
                incidents.append(
                    {
                        "namespace": namespace,
                        "pod": pod_name,
                        "severity": "Warning",
                        "reason": "Pending",
                        "message": "Pod is waiting to be scheduled.",
                    }
                )

            if not pod.status.container_statuses:
                continue

            for container in pod.status.container_statuses:

                # Waiting State
                if container.state.waiting:

                    reason = container.state.waiting.reason

                    severity = (
                        "Critical"
                        if reason in [
                            "CrashLoopBackOff",
                            "ImagePullBackOff",
                            "ErrImagePull",
                            "CreateContainerConfigError",
                            "CreateContainerError",
                        ]
                        else "Warning"
                    )

                    incidents.append(
                        {
                            "namespace": namespace,
                            "pod": pod_name,
                            "severity": severity,
                            "reason": reason,
                            "message": container.state.waiting.message or "",
                        }
                    )

                # Terminated State
                if container.state.terminated:

                    reason = container.state.terminated.reason

                    incidents.append(
                        {
                            "namespace": namespace,
                            "pod": pod_name,
                            "severity": "Critical",
                            "reason": reason,
                            "message": container.state.terminated.message or "",
                        }
                    )

                # Restart Count
                if container.restart_count > 3:

                    incidents.append(
                        {
                            "namespace": namespace,
                            "pod": pod_name,
                            "severity": "Warning",
                            "reason": "High Restarts",
                            "message": f"Restart Count: {container.restart_count}",
                        }
                    )

        return incidents
