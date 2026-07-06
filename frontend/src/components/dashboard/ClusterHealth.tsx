export default function ClusterHealth() {
  const services = [
    { name: "API Server", status: "Healthy" },
    { name: "Scheduler", status: "Healthy" },
    { name: "Controller Manager", status: "Healthy" },
    { name: "ETCD", status: "Healthy" },
    { name: "CoreDNS", status: "Healthy" },
  ];

  return (
    <div className="bg-slate-900 rounded-xl border border-slate-800 shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-white">
          Cluster Health
        </h2>

        <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm font-semibold">
          Healthy
        </span>
      </div>

      <div className="space-y-4">
        {services.map((service) => (
          <div
            key={service.name}
            className="flex justify-between items-center border-b border-slate-800 pb-3"
          >
            <div>
              <p className="text-white font-medium">
                {service.name}
              </p>

              <p className="text-slate-500 text-sm">
                Kubernetes Control Plane
              </p>
            </div>

            <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm">
              <span className="w-2 h-2 rounded-full bg-green-400"></span>
              {service.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
