export default function ClusterHealth() {

  const services = [
    "API Server",
    "Scheduler",
    "Controller Manager",
    "ETCD",
    "CoreDNS",
  ];

  return (
    <div className="bg-slate-900 rounded-xl border border-slate-800 p-5 h-72">

      <h2 className="text-xl font-semibold text-white mb-4">
        Cluster Health
      </h2>

      <div className="space-y-4">

        {services.map((service) => (
          <div
            key={service}
            className="flex justify-between items-center"
          >
            <span>{service}</span>

            <span className="text-green-400">
              ● Healthy
            </span>
          </div>
        ))}

      </div>

    </div>
  );
}