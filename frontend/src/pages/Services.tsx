import { useServices } from "../hooks/useServices";

export default function Services() {
  const { services, loading } = useServices();

  if (loading) {
    return (
      <div className="p-6 text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-6 text-white">

      <h1 className="text-3xl font-bold mb-6">
        Kubernetes Services
      </h1>

      <div className="bg-slate-900 rounded-xl overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-800">

            <tr>

              <th className="text-left p-4">Name</th>

              <th className="text-left p-4">Namespace</th>

              <th className="text-left p-4">Type</th>

              <th className="text-left p-4">Cluster IP</th>

              <th className="text-left p-4">Ports</th>

            </tr>

          </thead>

          <tbody>

            {services.map((service) => (

              <tr
                key={`${service.namespace}-${service.name}`}
                className="border-t border-slate-800 hover:bg-slate-800"
              >

                <td className="p-4">{service.name}</td>

                <td className="p-4">{service.namespace}</td>

                <td className="p-4">{service.type}</td>

                <td className="p-4">{service.cluster_ip}</td>

                <td className="p-4">
                  {service.ports
                    .map((p: any) => p.port)
                    .join(", ")}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}
