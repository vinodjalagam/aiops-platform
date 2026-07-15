class IncidentClassifier:

    @staticmethod
    def classify(
        pod,
        event,
    ):

        reason = event["reason"]
        message = event["message"]

        incident = {
            "resource": "Pod",
            "namespace": pod.metadata.namespace,
            "pod": pod.metadata.name,
            "severity": "Warning",
            "title": reason,
            "root_cause": "Unknown",
            "message": message,
        }

        # Failed Scheduling
        if reason == "FailedScheduling":

            incident["severity"] = "Critical"

            if "untolerated taint" in message.lower():

                incident["title"] = "No Schedulable Nodes"
                incident["root_cause"] = "Untolerated Taints"

            elif "insufficient cpu" in message.lower():

                incident["title"] = "Insufficient CPU"
                incident["root_cause"] = "CPU Exhaustion"

            elif "insufficient memory" in message.lower():

                incident["title"] = "Insufficient Memory"
                incident["root_cause"] = "Memory Exhaustion"

            else:

                incident["title"] = "Failed Scheduling"

            return incident

        # CrashLoop / BackOff
        if reason == "BackOff":

            incident["severity"] = "Critical"
            incident["title"] = "CrashLoopBackOff"
            incident["root_cause"] = "Container Crash"

            return incident

        # Image Pull
        if reason in (
            "ErrImagePull",
            "ImagePullBackOff",
        ):

            incident["severity"] = "Critical"
            incident["title"] = "Image Pull Failed"
            incident["root_cause"] = "Image Pull Error"

            return incident

        # Network
        if reason == "FailedCreatePodSandBox":

            incident["severity"] = "Critical"
            incident["title"] = "Pod Sandbox Creation Failed"

            if "calico" in message.lower():

                incident["root_cause"] = "Calico Networking Failure"

            else:

                incident["root_cause"] = "Container Runtime Networking"

            return incident

        return None
