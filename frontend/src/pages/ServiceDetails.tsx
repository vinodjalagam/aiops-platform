import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../components/common/Loading";
import {
  getService,
  type ServiceDetails,
} from "../services/serviceService";

export default function ServiceDetails() {

  const navigate = useNavigate();

  const { namespace, name } = useParams();

  const [service, setService] =
    useState<ServiceDetails | null>(null);

  useEffect(() => {

    if (namespace && name) {

      loadService(namespace, name);

    }

  }, [namespace, name]);

  const loadService = async (
    namespace: string,
    name: string,
  ) => {

    try {

      const data = await getService(
        namespace,
        name,
      );

      setService(data);

    } catch (error) {

      console.error(error);

    }

  };

if (!service) {
    return <Loading text="Loading Service..." />;
}
  return (

    <main className="flex-1 bg-slate-950 p-6">

      <div className="flex justify-between items-center mb-6">

        <div>

          <h1 className="text-3xl font-bold text-white">
            Service Details
          </h1>

          <p className="text-slate-400 mt-1">
            {service.name}
          </p>

        </div>

        <button
          onClick={() => navigate("/services")}
          className="bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-lg text-white"
        >
          Back
        </button>

      </div>

      {/* Overview */}

      <div className="bg-slate-900 rounded-xl border border-slate-700 p-6">

        <h2 className="text-xl font-semibold text-white mb-6">
          Overview
        </h2>

        <div className="grid grid-cols-2 gap-6">

          <div>

            <p className="text-slate-400">
              Namespace
            </p>

            <p className="text-white">
              {service.namespace}
            </p>

          </div>

          <div>

            <p className="text-slate-400">
              Type
            </p>

            <span className="inline-block mt-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-sm font-semibold">
              {service.type}
            </span>

          </div>

          <div>

            <p className="text-slate-400">
              Cluster IP
            </p>

            <p className="text-white">
              {service.cluster_ip}
            </p>

          </div>

          <div>

            <p className="text-slate-400">
              External IP
            </p>

            <p className="text-white">
              {service.external_ip?.length
                ? service.external_ip.join(", ")
                : "None"}
            </p>

          </div>

          <div>

            <p className="text-slate-400">
              Session Affinity
            </p>

            <p className="text-white">
              {service.session_affinity}
            </p>

          </div>

        </div>

      </div>

      {/* Ports */}

      <div className="bg-slate-900 rounded-xl border border-slate-700 p-6 mt-6">

        <h2 className="text-xl font-semibold text-white mb-6">
          Ports
        </h2>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="border-b border-slate-700">

                <th className="text-left py-3">
                  Name
                </th>

                <th className="text-left py-3">
                  Protocol
                </th>

                <th className="text-left py-3">
                  Port
                </th>

                <th className="text-left py-3">
                  Target Port
                </th>

                <th className="text-left py-3">
                  Node Port
                </th>

              </tr>

            </thead>

            <tbody>

              {service.ports.map((port, index) => (

                <tr
                  key={index}
                  className="border-b border-slate-800"
                >

                  <td className="py-3 text-white">
                    {port.name || "-"}
                  </td>

                  <td className="py-3 text-slate-300">
                    {port.protocol}
                  </td>

                  <td className="py-3 text-slate-300">
                    {port.port}
                  </td>

                  <td className="py-3 text-slate-300">
                    {port.target_port}
                  </td>

                  <td className="py-3 text-slate-300">
                    {port.node_port ?? "-"}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>
      {/* Selector */}

      <div className="bg-slate-900 rounded-xl border border-slate-700 p-6 mt-6">

        <h2 className="text-xl font-semibold text-white mb-6">
          Selector
        </h2>

        {Object.keys(service.selector).length === 0 ? (

          <p className="text-slate-400">
            No selector configured.
          </p>

        ) : (

          <div className="flex flex-wrap gap-3">

            {Object.entries(service.selector).map(
              ([key, value]) => (

                <span
                  key={key}
                  className="bg-blue-500/20 text-blue-400 px-3 py-2 rounded-lg"
                >
                  {key} = {value}
                </span>

              )
            )}

          </div>

        )}

      </div>
      {/* Endpoints */}

      <div className="bg-slate-900 rounded-xl border border-slate-700 p-6 mt-6">

        <h2 className="text-xl font-semibold text-white mb-6">
          Endpoints
        </h2>

        {service.endpoints.length === 0 ? (

          <p className="text-slate-400">
            No endpoints available.
          </p>

        ) : (

          <table className="w-full">

            <thead>

              <tr className="border-b border-slate-700">

                <th className="text-left py-3">
                  IP Address
                </th>

                <th className="text-left py-3">
                  Port
                </th>

              </tr>

            </thead>

            <tbody>

              {service.endpoints.map((endpoint, index) => (

                <tr
                  key={index}
                  className="border-b border-slate-800"
                >

                  <td className="py-3 text-white">
                    {endpoint.ip}
                  </td>

                  <td className="py-3 text-slate-300">
                    {endpoint.port}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        )}

      </div>

      {/* Labels */}

      <div className="bg-slate-900 rounded-xl border border-slate-700 p-6 mt-6">

        <h2 className="text-xl font-semibold text-white mb-6">
          Labels
        </h2>

        {Object.keys(service.labels).length === 0 ? (

          <p className="text-slate-400">
            No labels available.
          </p>

        ) : (

          <div className="space-y-3">

            {Object.entries(service.labels).map(
              ([key, value]) => (

                <div
                  key={key}
                  className="flex justify-between border-b border-slate-800 pb-2"
                >

                  <span className="text-blue-400">
                    {key}
                  </span>

                  <span className="text-slate-300">
                    {value}
                  </span>

                </div>

              )
            )}

          </div>

        )}

      </div>

    </main>

  );

}
