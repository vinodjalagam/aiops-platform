from app.incidents.event_queue import event_queue
from app.incidents.event_analyzer import EventAnalyzer
from app.incidents.classifier import IncidentClassifier
from app.incidents.incident_store import IncidentStore
from app.incidents.incident_processor import IncidentProcessor

class IncidentDetector:

    @staticmethod
    def process():

        print("Incident Detector Started...")

        while True:

            event = event_queue.get()

            if event["event"] != "MODIFIED":
                continue

            pod = event["pod"]

            print(f"\n[{pod.metadata.namespace}/{pod.metadata.name}]")
            print(f"Phase: {pod.status.phase}")

            events = EventAnalyzer.analyze_pod(pod)

            for e in events:

                incident = IncidentClassifier.classify(pod,e)
                IncidentProcessor.process(incident)

            if pod.status.phase == "Pending":
                print("⚠ INCIDENT: Pending Pod")

            if not pod.status.container_statuses:
                continue

            for container in pod.status.container_statuses:

                print(f"\nContainer: {container.name}")
                print(f"Restarts: {container.restart_count}")

                if container.restart_count >= 5:
                    print("⚠ INCIDENT: High Restart Count")

                if container.state and container.state.waiting:

                    reason = container.state.waiting.reason

                    print(f"Waiting Reason: {reason}")

                    if reason == "CrashLoopBackOff":
                        print("🚨 INCIDENT: CrashLoopBackOff")

                    elif reason == "ImagePullBackOff":
                        print("🚨 INCIDENT: ImagePullBackOff")

                    elif reason == "ErrImagePull":
                        print("🚨 INCIDENT: ErrImagePull")

                if container.state and container.state.terminated:

                    reason = container.state.terminated.reason

                    print(f"Terminated Reason: {reason}")

                    if reason == "OOMKilled":
                        print("🚨 INCIDENT: OOMKilled")
