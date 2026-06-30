from app.kubernetes.client import (
    core_v1,
    apps_v1,
    client,
)


class DashboardService:

    @staticmethod
    def get_dashboard():

        nodes = core_v1.list_node().items
        pods = core_v1.list_pod_for_all_namespaces().items
        deployments = apps_v1.list_deployment_for_all_namespaces().items
        services = core_v1.list_service_for_all_namespaces().items

        total_nodes = len(nodes)
        total_pods = len(pods)
        total_deployments = len(deployments)
        total_services = len(services)

        # Cluster Health
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

        cpu = 0
        memory = 0

        try:

            metrics_api = client.CustomObjectsApi()

            metrics = metrics_api.list_cluster_custom_object(
                group="metrics.k8s.io",
                version="v1beta1",
                plural="nodes",
            )

            total_cpu_usage = 0
            total_memory_usage = 0

            # -------------------------
            # Current Usage
            # -------------------------

            for item in metrics["items"]:

                cpu_usage = item["usage"]["cpu"]
                mem_usage = item["usage"]["memory"]

                # CPU → millicores

                if cpu_usage.endswith("n"):
                    total_cpu_usage += int(cpu_usage[:-1]) / 1_000_000

                elif cpu_usage.endswith("u"):
                    total_cpu_usage += int(cpu_usage[:-1]) / 1000

                elif cpu_usage.endswith("m"):
                    total_cpu_usage += int(cpu_usage[:-1])

                else:
                    total_cpu_usage += int(cpu_usage) * 1000

                # Memory → Mi

                if mem_usage.endswith("Ki"):
                    total_memory_usage += int(mem_usage[:-2]) / 1024

                elif mem_usage.endswith("Mi"):
                    total_memory_usage += int(mem_usage[:-2])

                elif mem_usage.endswith("Gi"):
                    total_memory_usage += int(mem_usage[:-2]) * 1024

            # -------------------------
            # Allocatable Capacity
            # -------------------------

            total_cpu_capacity = 0
            total_memory_capacity = 0

            for node in nodes:

                cpu_capacity = node.status.allocatable["cpu"]
                mem_capacity = node.status.allocatable["memory"]

                # CPU

                if cpu_capacity.endswith("m"):
                    total_cpu_capacity += int(cpu_capacity[:-1])

                else:
                    total_cpu_capacity += int(cpu_capacity) * 1000

                # Memory

                if mem_capacity.endswith("Ki"):
                    total_memory_capacity += int(mem_capacity[:-2]) / 1024

                elif mem_capacity.endswith("Mi"):
                    total_memory_capacity += int(mem_capacity[:-2])

                elif mem_capacity.endswith("Gi"):
                    total_memory_capacity += int(mem_capacity[:-2]) * 1024

            # -------------------------
            # Percentage
            # -------------------------

            if total_cpu_capacity:
                cpu = round(
                    (total_cpu_usage / total_cpu_capacity) * 100
                )

            if total_memory_capacity:
                memory = round(
                    (total_memory_usage / total_memory_capacity) * 100
                )

        except Exception as e:
            print("Metrics Error:", e)

        return {
            "nodes": total_nodes,
            "pods": total_pods,
            "deployments": total_deployments,
            "services": total_services,
            "cpu": cpu,
            "memory": memory,
            "alerts": 0,
            "cluster_health": cluster_health,
        }
