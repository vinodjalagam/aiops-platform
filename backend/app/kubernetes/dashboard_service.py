from app.kubernetes.client import (
    core_v1,
    apps_v1,
    client,
    async_core_v1,
    async_apps_v1,
)
from app.utils.cache import cached, dashboard_cache
import asyncio


class DashboardService:

    @staticmethod
    @cached(dashboard_cache, "dashboard")
    async def get_dashboard_async():
        """Async version with parallel API calls for better performance"""
        # Make all API calls in parallel
        nodes_task = async_core_v1.list_node()
        pods_task = async_core_v1.list_pod_for_all_namespaces()
        deployments_task = async_apps_v1.list_deployment_for_all_namespaces()
        services_task = async_core_v1.list_service_for_all_namespaces()
        namespaces_task = async_core_v1.list_namespace()
        
        # Execute all calls concurrently
        nodes, pods, deployments, services, namespaces = await asyncio.gather(
            nodes_task, pods_task, deployments_task, services_task, namespaces_task
        )
        
        nodes = nodes.items
        pods = pods.items
        deployments = deployments.items
        services = services.items
        namespaces = namespaces.items

        total_nodes = len(nodes)
        total_pods = len(pods)
        total_deployments = len(deployments)
        total_services = len(services)
        total_namespaces = len(namespaces)

        running_pods = 0
        pending_pods = 0
        failed_pods = 0
        succeeded_pods = 0
        restarting_pods = 0

        available_deployments = 0
        unavailable_deployments = 0
        
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
        # Pod Summary

        for pod in pods:

            if pod.status.phase == "Running":
                running_pods += 1

            elif pod.status.phase == "Pending":
                pending_pods += 1

            elif pod.status.phase == "Failed":
                failed_pods += 1

            elif pod.status.phase == "Succeeded":
                succeeded_pods += 1

            if pod.status.container_statuses:

                for container in pod.status.container_statuses:

                    restarting_pods += (
                        container.restart_count
                    )

        # Deployment Summary

        for deployment in deployments:

            desired = deployment.spec.replicas or 0

            available = (
                deployment.status.available_replicas or 0
            )

            if available >= desired:

                available_deployments += 1

            else:

                unavailable_deployments += 1
        cpu = 0
        memory = 0

        try:
            metrics_api = client.CustomObjectsApi()
            metrics_task = asyncio.to_thread(
                metrics_api.list_cluster_custom_object,
                group="metrics.k8s.io",
                version="v1beta1",
                plural="nodes",
            )
            metrics = await metrics_task

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
        warning_events = 0
        critical_events = 0

        try:
            events_task = async_core_v1.list_event_for_all_namespaces()
            events = (await events_task).items

            for event in events:

                if event.type == "Warning":

                    warning_events += 1

                    if event.reason in [
                        "Failed",
                        "BackOff",
                        "CrashLoopBackOff",
                        "OOMKilled",
                        "FailedMount",
                        "ImagePullBackOff",
                    ]:

                        critical_events += 1

        except Exception:

            pass

        health_status = "Healthy"

        if (
            unavailable_deployments > 0
            or failed_pods > 0
            or critical_events > 0
        ):

            health_status = "Critical"

        elif (
            pending_pods > 0
            or restarting_pods > 0
            or warning_events > 0
        ):

            health_status = "Warning"

        if health_status == "Healthy":
            cluster_health = 100

        elif health_status == "Warning":
            cluster_health = 75

        else:
            cluster_health = 40

        return {
            "nodes": {
                "total": total_nodes,
                "ready": ready_nodes,
                "not_ready": total_nodes - ready_nodes,
            },
            "pods": {
                "total": total_pods,
                "running": running_pods,
                "pending": pending_pods,
                "failed": failed_pods,
                "succeeded": succeeded_pods,
                "restarting": restarting_pods,
            },
            "deployments": {
                "total": total_deployments,
                "available": available_deployments,
                "unavailable": unavailable_deployments,
            },
            "services": {
                "total": total_services,
            },
            "namespaces": {
                "total": total_namespaces,
            },
            "events": {
                "warning": warning_events,
                "critical": critical_events,
            },
            "cpu": cpu,
            "memory": memory,
            "cluster_health": {
                "score": cluster_health,
                "status": health_status,
            },
        }

    @staticmethod
    def get_dashboard():
        """Synchronous wrapper for backward compatibility"""
        return asyncio.run(DashboardService.get_dashboard_async())
