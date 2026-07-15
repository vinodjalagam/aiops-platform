incidents = []


class IncidentStore:

    @staticmethod
    def add(data):

        if data is None:
            return

        incident = data["incident"]

        for existing in incidents:

            existing_incident = existing["incident"]

            if (
                existing_incident["title"] == incident["title"]
                and existing_incident["message"] == incident["message"]
                and existing_incident["pod"] == incident["pod"]
            ):
                return

        incidents.append(data)

        print("\n==========================================")
        print("🚨 NEW AI INCIDENT")
        print("==========================================")

        print("\nIncident")
        print("------------------------------------------")
        print(data["incident"])

        print("\nAI Diagnosis")
        print("------------------------------------------")
        print(data["diagnosis"])

        print("==========================================")
