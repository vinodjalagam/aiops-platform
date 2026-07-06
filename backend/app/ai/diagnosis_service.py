class DiagnosisService:

    NODE_DIAGNOSIS = {

        "NodeStatusUnknown": {
            "severity": "Critical",
            "title": "Node Status Unknown",
            "explanation": "The API server is no longer receiving heartbeats from the kubelet.",

            "recommended_actions": [
                "Check rke2-server service",
                "Check kubelet logs",
                "Verify network connectivity",
                "Check node CPU and memory",
            ]
        },

        "KubeletNotReady": {
            "severity": "Critical",
            "title": "Kubelet Not Ready",
            "explanation": "The kubelet is unable to report the node as healthy.",

            "recommended_actions": [
                "Restart rke2-server",
                "Verify container runtime",
                "Check CNI pods",
            ]
        },

        "NodeHasDiskPressure": {
            "severity": "Warning",
            "title": "Disk Pressure",

            "recommended_actions": [
                "Clean unused images",
                "Remove old logs",
                "Increase disk capacity",
            ]
        },
    }

    @staticmethod
    def diagnose(reason: str):
        return DiagnosisService.NODE_DIAGNOSIS.get(
            reason,
            {
                "severity": "Unknown",
                "title": reason,
                "explanation": "No diagnosis available.",
                "recommended_actions": [],
            },
        )
