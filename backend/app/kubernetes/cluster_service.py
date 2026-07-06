from app.kubernetes.client import (
    core_v1,
    apps_v1,
    version_api,
)

class ClusterService:

    @staticmethod
    def get_cluster():

        nodes = core_v1.list_node().items
        pods = core_v1.list_pod_for_all_namespaces().items
        deployments = apps_v1.list_deployment_for_all_namespaces().items
        services = core_v1.list_service_for_all_namespaces().items
        namespaces = core_v1.list_namespace().items

        ready_nodes = 0

        for node in nodes:
            for condition in node.status.conditions:
                if (
                    condition.type == "Ready"
                    and condition.status == "True"
                ):
                    ready_nodes += 1

        version = version_api.get_code()

        components = []

        system_pods = core_v1.list_namespaced_pod(
            "kube-system"
        ).items

        component_names = {
            "kube-apiserver": "API Server",
            "kube-scheduler": "Scheduler",
            "kube-controller-manager": "Controller Manager",
            "etcd": "ETCD",
            "coredns": "CoreDNS",
        }

        seen = set()

        for pod in system_pods:

            for prefix, display_name in component_names.items():

                if (
                    pod.metadata.name.startswith(prefix)
                    and display_name not in seen
                ):

                    components.append(
                        {
                            "name": display_name,
                            "status": pod.status.phase,
                        }
                    )

                    seen.add(display_name)

        running_components = sum(
            1
            for component in components
            if component["status"] == "Running"
        )

        health = (
            "Healthy"
            if ready_nodes == len(nodes)
            else "Warning"
        )

        node_summary = []

        for node in nodes:

            role = "Worker"

            labels = node.metadata.labels

            if (
                "node-role.kubernetes.io/control-plane"
                in labels
            ):
                role = "Control Plane"

            status = "Not Ready"

            for condition in node.status.conditions:

                if (
                    condition.type == "Ready"
                    and condition.status == "True"
                ):
                    status = "Ready"

            node_summary.append(
                {
                    "name": node.metadata.name,
                    "role": role,
                    "status": status,
                    "version": node.status.node_info.kubelet_version,
                }
            )
        return {
            "cluster_name": "Kubernetes Cluster",
            "kubernetes_version": version.git_version,
            "health": health,
            "nodes": {
                "total": len(nodes),
                "ready": ready_nodes,
                "not_ready": len(nodes) - ready_nodes,
            },
            "resources": {
                "pods": len(pods),
                "deployments": len(deployments),
                "services": len(services),
                "namespaces": len(namespaces),
            },

            "healthy_components": running_components,

            "total_components": len(components),
            "node_summary": node_summary,
            "components": components,
        }
