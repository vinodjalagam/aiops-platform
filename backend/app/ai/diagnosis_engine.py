from app.ai.models import DiagnosisContext


class DiagnosisEngine:

    @staticmethod
    def diagnose(
        context: DiagnosisContext,
    ):

        evidence = []

        causes = []

        actions = []

        confidence = 60

        for event in context.events:

            reason = event["reason"]

            message = event["message"].lower()

            evidence.append(reason)

            # Failed Scheduling
            if reason == "FailedScheduling":

                confidence = 95

                if "untolerated taint" in message:

                    causes.append(
                        "Pod does not tolerate node taints."
                    )

                    actions.extend(
                        [
                            "Inspect node taints.",
                            "Add matching tolerations.",
                        ]
                    )

                elif "insufficient cpu" in message:

                    causes.append(
                        "Cluster CPU exhausted."
                    )

                    actions.extend(
                        [
                            "Scale worker nodes.",
                            "Reduce CPU requests.",
                        ]
                    )

                elif "insufficient memory" in message:

                    causes.append(
                        "Cluster memory exhausted."
                    )

                    actions.extend(
                        [
                            "Scale memory.",
                            "Reduce memory requests.",
                        ]
                    )

            # CrashLoop
            elif reason == "BackOff":

                confidence = 98

                causes.append(
                    "Container repeatedly crashes."
                )

                actions.extend(
                    [
                        "Inspect container logs.",
                        "Verify startup command.",
                        "Check environment variables.",
                    ]
                )

            # Image Pull
            elif reason in (
                "ErrImagePull",
                "ImagePullBackOff",
            ):

                confidence = 97

                causes.append(
                    "Image cannot be pulled."
                )

                actions.extend(
                    [
                        "Verify image name.",
                        "Verify registry credentials.",
                    ]
                )

            # Network
            elif reason == "FailedCreatePodSandBox":

                confidence = 97

                causes.append(
                    "Container networking failed."
                )

                if "calico" in message:

                    actions.append(
                        "Inspect Calico components."
                    )

                if "certificate" in message:

                    actions.append(
                        "Verify Kubernetes certificates."
                    )

        return {

            "resource": context.resource,

            "name": context.name,

            "namespace": context.namespace,

            "phase": context.phase,

            "confidence": confidence,

            "evidence": sorted(
                list(set(evidence))
            ),

            "possible_causes": sorted(
                list(set(causes))
            ),

            "recommended_actions": sorted(
                list(set(actions))
            ),
        }
