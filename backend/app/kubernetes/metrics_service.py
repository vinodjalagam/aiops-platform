from app.kubernetes.client import (
    core_v1,
    client,
)


class MetricsService:

    @staticmethod
    def get_metrics():

        nodes = core_v1.list_node().items

        metrics_api = client.CustomObjectsApi()

        metrics = metrics_api.list_cluster_custom_object(
            group="metrics.k8s.io",
            version="v1beta1",
            plural="nodes",
        )

        total_cpu_usage = 0
        total_memory_usage = 0

        total_cpu_capacity = 0
        total_memory_capacity = 0

        node_metrics = []

        for item in metrics["items"]:

            cpu_usage = item["usage"]["cpu"]
            memory_usage = item["usage"]["memory"]

            cpu_m = 0

            if cpu_usage.endswith("n"):
                cpu_m = int(cpu_usage[:-1]) / 1_000_000

            elif cpu_usage.endswith("u"):
                cpu_m = int(cpu_usage[:-1]) / 1000

            elif cpu_usage.endswith("m"):
                cpu_m = int(cpu_usage[:-1])

            else:
                cpu_m = int(cpu_usage) * 1000

            if memory_usage.endswith("Ki"):
                memory_mi = int(memory_usage[:-2]) / 1024

            elif memory_usage.endswith("Mi"):
                memory_mi = int(memory_usage[:-2])

            elif memory_usage.endswith("Gi"):
                memory_mi = int(memory_usage[:-2]) * 1024

            else:
                memory_mi = 0

            total_cpu_usage += cpu_m
            total_memory_usage += memory_mi

            node_metrics.append(
                {
                    "name": item["metadata"]["name"],
                    "cpu_m": round(cpu_m, 2),
                    "memory_mi": round(memory_mi, 2),
                }
            )

        for node in nodes:

            cpu_capacity = node.status.allocatable["cpu"]
            memory_capacity = node.status.allocatable["memory"]

            if cpu_capacity.endswith("m"):
                total_cpu_capacity += int(cpu_capacity[:-1])

            else:
                total_cpu_capacity += int(cpu_capacity) * 1000

            if memory_capacity.endswith("Ki"):
                total_memory_capacity += int(memory_capacity[:-2]) / 1024

            elif memory_capacity.endswith("Mi"):
                total_memory_capacity += int(memory_capacity[:-2])

            elif memory_capacity.endswith("Gi"):
                total_memory_capacity += int(memory_capacity[:-2]) * 1024

        cpu_percent = round(
            (total_cpu_usage / total_cpu_capacity) * 100
        )

        memory_percent = round(
            (total_memory_usage / total_memory_capacity) * 100
        )

        return {
            "cpu": {
                "percentage": cpu_percent,
                "used": round(total_cpu_usage / 1000, 2),
                "total": round(total_cpu_capacity / 1000, 2),
            },
            "memory": {
                "percentage": memory_percent,
                "used": round(total_memory_usage / 1024, 2),
                "total": round(total_memory_capacity / 1024, 2),
            },
            "nodes": node_metrics,
        }
