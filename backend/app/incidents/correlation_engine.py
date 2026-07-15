class CorrelationEngine:

    @staticmethod
    def correlate(incidents):

        if not incidents:
            return []

        correlated = []

        # Example Rule 1
        scheduling = [
            i for i in incidents
            if i["title"] == "No Schedulable Nodes"
        ]

        if scheduling:

            correlated.append({
                "severity": "Critical",
                "title": "Cluster Scheduling Failure",
                "root_cause": (
                    "Pods cannot be scheduled because "
                    "cluster nodes are unavailable "
                    "or have untolerated taints."
                ),
                "confidence": 95,
                "affected_incidents": len(scheduling),
            })

        return correlated
