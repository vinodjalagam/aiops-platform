from app.ai.context_builder import ContextBuilder
from app.ai.diagnosis_engine import DiagnosisEngine
from app.incidents.incident_store import IncidentStore


class IncidentProcessor:

    @staticmethod
    def process(incident):

        if incident is None:
            return

        if incident["resource"] != "Pod":
            return

        context = ContextBuilder.build_pod_context(
            namespace=incident["namespace"],
            name=incident["pod"],
        )

        diagnosis = DiagnosisEngine.diagnose(context)

        IncidentStore.add(
            {
                "incident": incident,
                "diagnosis": diagnosis,
            }
        )
