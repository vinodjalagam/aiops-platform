from app.kubernetes.client import core_v1


class NodeService:

    @staticmethod
    def get_nodes():

        nodes = core_v1.list_node().items

        result = []

        for node in nodes:

            role = "Worker"

            labels = node.metadata.labels

            if "node-role.kubernetes.io/control-plane" in labels:
                role = "Control Plane"

            status = "Unknown"

            for condition in node.status.conditions:
                if condition.type == "Ready":
                    status = condition.status

            result.append(
                {
                    "name": node.metadata.name,
                    "status": "Ready" if status == "True" else "Not Ready",
                    "role": role,
                    "version": node.status.node_info.kubelet_version,
                }
            )

        return result