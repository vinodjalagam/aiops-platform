from concurrent.futures import ThreadPoolExecutor
from app.kubernetes.client import core_v1


class DashboardService:

    @staticmethod
    def get_dashboard():

        with ThreadPoolExecutor() as executor:
            nodes_future = executor.submit(core_v1.list_node)
            pods_future = executor.submit(core_v1.list_pod_for_all_namespaces)

            nodes = nodes_future.result().items
            pods = pods_future.result().items

        total_nodes = len(nodes)
        total_pods = len(pods)

        ready_nodes = 0

        for node in nodes:
            for condition in node.status.conditions:
                if (
                    condition.type == "Ready"
                    and condition.status == "True"
                ):
                    ready_nodes += 1

        cluster_health = (
            int((ready_nodes / total_nodes) * 100)
            if total_nodes > 0
            else 0
        )

        return {
            "nodes": total_nodes,
            "pods": total_pods,
            "cpu": 0,
            "memory": 0,
            "alerts": 0,
            "cluster_health": cluster_health,
        }
