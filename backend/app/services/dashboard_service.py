from app.schemas.dashboard import DashboardResponse


class DashboardService:

    @staticmethod
    def get_dashboard() -> DashboardResponse:
        return DashboardResponse(
            nodes=7,
            pods=128,
            cpu=45,
            memory=62,
            alerts=12,
            cluster_health=98,
        )