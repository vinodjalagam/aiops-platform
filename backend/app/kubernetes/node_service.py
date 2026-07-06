from app.kubernetes.client import core_v1
from app.ai.diagnosis_service import DiagnosisService


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
            reason = ""
            message = ""

            for condition in node.status.conditions:

                if condition.type == "Ready":

                    status = condition.status
                    reason = condition.reason or ""
                    message = condition.message or ""

            diagnosis = DiagnosisService.diagnose(reason)

            result.append(
                {
                    "name": node.metadata.name,
                    "status": (
                        "Ready"
                        if status == "True"
                        else "Not Ready"
                    ),
                    "role": role,
                    "version": node.status.node_info.kubelet_version,
                    "reason": reason,
                    "message": message,
                    "diagnosis": diagnosis,
                }
            )

        return result

    @staticmethod
    def get_node(name: str):

        node = core_v1.read_node(name)

        labels = []

        for key, value in node.metadata.labels.items():

            labels.append(
                {
                    "key": key,
                    "value": value,
                }
            )

        taints = []

        if node.spec.taints:

            for taint in node.spec.taints:

                taints.append(
                    {
                        "key": taint.key,
                        "value": taint.value,
                        "effect": taint.effect,
                    }
                )

        conditions = []

        for condition in node.status.conditions:

            conditions.append(
                {
                    "type": condition.type,
                    "status": condition.status,
                    "reason": condition.reason,
                    "message": condition.message,
                    "last_heartbeat": (
                        str(condition.last_heartbeat_time)
                        if condition.last_heartbeat_time
                        else None
                    ),
                    "last_transition": (
                        str(condition.last_transition_time)
                        if condition.last_transition_time
                        else None
                    ),
                }
            )

        capacity = {
            "cpu": node.status.capacity.get("cpu"),
            "memory": node.status.capacity.get("memory"),
            "pods": node.status.capacity.get("pods"),
        }

        allocatable = {
            "cpu": node.status.allocatable.get("cpu"),
            "memory": node.status.allocatable.get("memory"),
            "pods": node.status.allocatable.get("pods"),
        }

        pods = core_v1.list_pod_for_all_namespaces().items

        running_pods = []

        for pod in pods:

            if pod.spec.node_name == name:

                running_pods.append(
                    {
                        "name": pod.metadata.name,
                        "namespace": pod.metadata.namespace,
                        "status": pod.status.phase,
                    }
                )

        ready_condition = next(
            (
                condition
                for condition in node.status.conditions
                if condition.type == "Ready"
            ),
            None,
        )

        ready_reason = (
            ready_condition.reason
            if ready_condition
            else ""
        )

        ready_message = (
            ready_condition.message
            if ready_condition
            else ""
        )

        diagnosis = DiagnosisService.diagnose(
            ready_reason
        )

        return {

            "name": node.metadata.name,

            "status": (
                "Ready"
                if ready_condition
                and ready_condition.status == "True"
                else "Not Ready"
            ),

            "ready_reason": ready_reason,

            "ready_message": ready_message,

            "diagnosis": diagnosis,

            "os_image": node.status.node_info.os_image,

            "kernel_version": (
                node.status.node_info.kernel_version
            ),

            "container_runtime": (
                node.status.node_info.container_runtime_version
            ),

            "kubelet_version": (
                node.status.node_info.kubelet_version
            ),

            "capacity": capacity,

            "allocatable": allocatable,

            "labels": labels,

            "taints": taints,

            "conditions": conditions,

            "running_pods": running_pods,
        }
