from kubernetes import watch, client

from app.incidents.event_queue import event_queue


class PodWatcher:

    @staticmethod
    def watch():

        core_v1 = client.CoreV1Api()

        watcher = watch.Watch()

        print("Pod Watcher Started...")

        for event in watcher.stream(
            core_v1.list_pod_for_all_namespaces
        ):

            pod = event["object"]

            event_type = event["type"]

            event_queue.put(
                {
                    "resource": "Pod",
                    "event": event_type,
                    "pod": pod,
                }
            )

            print(
                f"[POD] {event_type} "
                f"{pod.metadata.namespace}/"
                f"{pod.metadata.name}"
            )
