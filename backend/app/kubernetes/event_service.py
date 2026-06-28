from app.kubernetes.client import core_v1


class EventService:

    @staticmethod
    def get_events():
        events = core_v1.list_event_for_all_namespaces().items

        result = []

        for event in events:
            result.append({
                "namespace": event.metadata.namespace,
                "type": event.type,
                "reason": event.reason,
                "object": event.involved_object.kind,
                "name": event.involved_object.name,
                "message": event.message,
                "time": str(event.last_timestamp or event.event_time or event.metadata.creation_timestamp),
            })

        return result
