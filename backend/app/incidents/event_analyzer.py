from app.kubernetes.client import core_v1


class EventAnalyzer:

    @staticmethod
    def analyze_pod(pod):

        events = core_v1.list_namespaced_event(
            namespace=pod.metadata.namespace
        ).items

        results = []

        for event in events:

            involved = event.involved_object

            if involved.name != pod.metadata.name:
                continue

            results.append(
                {
                    "reason": event.reason,
                    "message": event.message,
                    "type": event.type,
                }
            )

        return results
