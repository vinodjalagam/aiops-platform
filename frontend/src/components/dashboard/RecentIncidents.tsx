import { useNavigate } from "react-router-dom";
import { useIncidents } from "../../hooks/useIncidents";
import Loading from "../common/Loading";

export default function RecentIncidents() {
  const { incidents, loading } = useIncidents();

  const navigate = useNavigate();

  if (loading) {
    return <Loading text="Loading Incidents..." />;
  }

  // Hide Kubernetes system namespace incidents from dashboard
  const dashboardIncidents = (incidents ?? []).filter(
    (incident) =>
      ![
        "kube-system",
        "kube-public",
        "kube-node-lease",
        "calico-system",
        "tigera-operator",
      ].includes(incident.namespace)
  );

  return (
    <div className="bg-slate-900 rounded-xl border border-slate-800 p-5 h-80">

      {/* Header */}

      <div className="flex justify-between items-center mb-4">

        <h2 className="text-xl font-semibold text-white">
          Recent Incidents
        </h2>

        <button
          onClick={() => navigate("/incidents")}
          className="text-blue-400 hover:text-blue-300 text-sm"
        >
          View All
        </button>

      </div>

      {/* Incidents */}

      <div className="space-y-3">

        {dashboardIncidents.length > 0 ? (

          dashboardIncidents.slice(0, 5).map((incident) => (

            <div
              key={`${incident.namespace}-${incident.pod}-${incident.reason}`}
              onClick={() =>
                navigate(
                  `/pods/${incident.namespace}/${incident.pod}`
                )
              }
              className="flex justify-between items-start rounded-lg border border-slate-800 p-3 cursor-pointer hover:bg-slate-800 transition"
            >

              <div className="min-w-0">

                <p className="text-white font-semibold">
                  {incident.reason}
                </p>

                <p className="text-slate-300 text-sm truncate">
                  {incident.pod}
                </p>

                <p className="text-slate-500 text-xs">
                  {incident.namespace}
                </p>

              </div>

              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  incident.severity === "Critical"
                    ? "bg-red-500/20 text-red-400"
                    : "bg-yellow-500/20 text-yellow-400"
                }`}
              >
                {incident.severity}
              </span>

            </div>

          ))

        ) : (

          <div className="flex items-center justify-center h-48">

            <p className="text-slate-400">
              🎉 No Application Incidents Found
            </p>

          </div>

        )}

      </div>

    </div>
  );
}
