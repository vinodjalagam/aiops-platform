export default function RecentIncidents() {
  const incidents = [
    {
      id: 1,
      title: "Node worker-01 Not Ready",
      severity: "Critical",
    },
    {
      id: 2,
      title: "High CPU on worker-02",
      severity: "Warning",
    },
    {
      id: 3,
      title: "Pod CrashLoopBackOff",
      severity: "Critical",
    },
    {
      id: 4,
      title: "Deployment restarted",
      severity: "Info",
    },
  ];

  return (
    <div className="bg-slate-900 rounded-xl border border-slate-800 p-5 h-80">
      <h2 className="text-xl font-semibold text-white mb-4">
        Recent Incidents
      </h2>

      <div className="space-y-3">
        {incidents.map((incident) => (
          <div
            key={incident.id}
            className="flex justify-between items-center border-b border-slate-800 pb-3"
          >
            <span className="text-slate-200">
              {incident.title}
            </span>

            <span
              className={`text-sm px-2 py-1 rounded ${
                incident.severity === "Critical"
                  ? "bg-red-500/20 text-red-400"
                  : incident.severity === "Warning"
                  ? "bg-yellow-500/20 text-yellow-400"
                  : "bg-blue-500/20 text-blue-400"
              }`}
            >
              {incident.severity}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}