from kubernetes import client

from app.kubernetes.client import (
    get_core_v1,
    get_apps_v1,
)

class DashboardService:

    @staticmethod
    def get_dashboard():
	core_v1 = get_core_v1()
	apps_v1 = get_apps_v1()
        print("===== Dashboard API Started =====")

        print("1. Getting Nodes")
        nodes = core_v1.list_node(
            _request_timeout=10
        ).items
        print("✔ Nodes OK")

        print("2. Getting Pods")
        pods = core_v1.list_pod_for_all_namespaces(
            _request_timeout=10
        ).items
        print("✔ Pods OK")

        print("3. Getting Deployments")
        deployments = apps_v1.list_deployment_for_all_namespaces(
            _request_timeout=10
        ).items
        print("✔ Deployments OK")

        print("4. Getting Services")
        services = core_v1.list_service_for_all_namespaces(
            _request_timeout=10
        ).items
        print("✔ Services OK")

        print("5. Getting Namespaces")
        namespaces = core_v1.list_namespace(
            _request_timeout=10
        ).items
        print("✔ Namespaces OK")

        ready_nodes = 0

        for node in nodes:
            for condition in node.status.conditions:
                if (
                    condition.type == "Ready"
                    and condition.status == "True"
                ):
                    ready_nodes += 1

        print("===== Dashboard API Completed =====")

        return {
            "nodes": {
                "total": len(nodes),
                "ready": ready_nodes,
                "not_ready": len(nodes) - ready_nodes,
            },
            "pods": {
                "total": len(pods),
                "running": 0,
                "pending": 0,
                "failed": 0,
                "succeeded": 0,
                "restarting": 0,
            },
            "deployments": {
                "total": len(deployments),
                "available": 0,
                "unavailable": 0,
            },
            "services": {
                "total": len(services),
            },
            "namespaces": {
                "total": len(namespaces),
            },
            "events": {
                "warning": 0,
                "critical": 0,
            },
            "cpu": {
                "percentage": 0,
                "used": 0,
                "total": 0,
            },
            "memory": {
                "percentage": 0,
                "used": 0,
                "total": 0,
            },
            "cluster_health": {
                "score": 100,
                "status": "Healthy",
            },
        }
