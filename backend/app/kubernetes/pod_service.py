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
