from app.kubernetes.incident_service import IncidentService


class AlertService:

    @staticmethod
    def get_alerts():
        return IncidentService.get_incidents()
