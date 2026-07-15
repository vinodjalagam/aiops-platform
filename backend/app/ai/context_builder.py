from app.ai.models import DiagnosisContext
from app.kubernetes.client import core_v1


class ContextBuilder:

    @staticmethod
    def build_pod_context(namespace: str, name: str):

        pod = core_v1.read_namespaced_pod(
            name=name,
            namespace=namespace,
        )

        events = core_v1.list_namespaced_event(
            namespace=namespace,
        ).items

        IMPORTANT_EVENTS = {
            "FailedScheduling",
            "BackOff",
            "CrashLoopBackOff",
            "FailedCreatePodSandBox",
            "ImagePullBackOff",
            "ErrImagePull",
            "OOMKilled",
            "FailedMount",
            "Unhealthy",
        }

        pod_events = []

        for event in events:

            if event.involved_object.name != name:
                continue

            if (
                event.reason in IMPORTANT_EVENTS
                or event.type == "Warning"
            ):

                pod_events.append(
                    {
                        "reason": event.reason,
                        "message": event.message,
                        "type": event.type,
                    }
                )

        return DiagnosisContext(
            resource="Pod",
            namespace=namespace,
            name=name,
            phase=pod.status.phase,
            node=pod.spec.node_name,
            labels=pod.metadata.labels or {},
            annotations=pod.metadata.annotations or {},
            events=pod_events,
        )
