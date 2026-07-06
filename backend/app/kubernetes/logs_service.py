from app.kubernetes.client import core_v1


class LogsService:

    @staticmethod
    def get_logs(
        namespace: str,
        pod_name: str,
        tail_lines: int,
    ):

        logs = core_v1.read_namespaced_pod_log(
            name=pod_name,
            namespace=namespace,
            tail_lines=tail_lines,
            timestamps=True,
        )

        return {
            "pod": pod_name,
            "namespace": namespace,
            "tail_lines": tail_lines,
            "logs": logs,
        }
