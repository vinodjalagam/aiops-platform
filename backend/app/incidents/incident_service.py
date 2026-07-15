from app.incidents.incident_store import incidents
from app.incidents.correlation_engine import CorrelationEngine


class IncidentService:

    @staticmethod
    def get_all():

        correlated = CorrelationEngine.correlate(
            incidents
        )

        return {
            "incidents": incidents,
            "correlated": correlated,
        }
