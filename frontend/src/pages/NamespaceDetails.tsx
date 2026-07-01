import { useNavigate, useParams } from "react-router-dom";
import { useNamespace } from "../hooks/useNamespace";
import Loading from "../components/common/Loading";
export default function NamespaceDetails() {
  const { name } = useParams();
  const navigate = useNavigate();

  const { namespace, loading } = useNamespace(name!);
  if (loading) {
     return <Loading text="Loading Namespace..." />;
}

return (
  <main className="flex-1 bg-slate-950 p-6">

<div className="flex justify-between items-center mb-8">

  <div>

    <h1 className="text-3xl font-bold text-white">
      Namespace Details
    </h1>

    <p className="text-slate-400 mt-2">
      {namespace.name}
    </p>

  </div>

  <button
    onClick={() => navigate("/namespaces")}
    className="bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-lg text-white"
  >
    Back
  </button>

</div>
    {/* Overview */}

    <div className="bg-slate-900 rounded-xl border border-slate-700 p-6 mb-6">

      <h2 className="text-xl font-semibold text-white mb-6">
        Overview
      </h2>

      <div className="grid grid-cols-3 gap-6">

        <div>

          <p className="text-slate-400">
            Name
          </p>

          <p className="text-white">
            {namespace.name}
          </p>

        </div>

        <div>

          <p className="text-slate-400">
            Status
          </p>

          <p
            className={
              namespace.status === "Active"
                ? "text-green-400 font-semibold"
                : "text-red-400 font-semibold"
            }
          >
            {namespace.status}
          </p>

        </div>

        <div>

          <p className="text-slate-400">
            Created
          </p>

          <p className="text-white">
            {namespace.created}
          </p>

        </div>

      </div>

    </div>

    {/* Pods */}

    <div className="bg-slate-900 rounded-xl border border-slate-700 p-6 mb-6">

      <h2 className="text-xl font-semibold text-white mb-6">
        Pods ({namespace.pods.length})
      </h2>

      <table className="w-full">

        <thead>

          <tr className="border-b border-slate-700">

            <th className="text-left py-3">
              Name
            </th>

            <th className="text-left py-3">
              Status
            </th>

            <th className="text-left py-3">
              Node
            </th>

          </tr>

        </thead>

        <tbody>

          {namespace.pods.map((pod: any) => (

            <tr
              key={pod.name}
              className="border-b border-slate-800"
            >

<td className="py-3">
  <button
    onClick={() =>
      navigate(`/pods/${namespace.name}/${pod.name}`)
    }
    className="text-blue-400 hover:text-blue-300 hover:underline"
  >
    {pod.name}
  </button>
</td>
            </tr>

          ))}

        </tbody>

      </table>

    </div>

    {/* Services */}

    <div className="bg-slate-900 rounded-xl border border-slate-700 p-6 mb-6">

      <h2 className="text-xl font-semibold text-white mb-6">
        Services ({namespace.services.length})
      </h2>

      <table className="w-full">

        <thead>

          <tr className="border-b border-slate-700">

            <th className="text-left py-3">
              Name
            </th>

            <th className="text-left py-3">
              Type
            </th>

          </tr>

        </thead>

        <tbody>

          {namespace.services.map((service: any) => (

            <tr
              key={service.name}
              className="border-b border-slate-800"
            >

<td className="py-3">
  <button
    onClick={() =>
      navigate(`/services/${namespace.name}/${service.name}`)
    }
    className="text-blue-400 hover:text-blue-300 hover:underline"
  >
    {service.name}
  </button>
</td>
              <td className="py-3 text-slate-300">
                {service.type}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

    {/* Deployments */}

    <div className="bg-slate-900 rounded-xl border border-slate-700 p-6">

      <h2 className="text-xl font-semibold text-white mb-6">
        Deployments ({namespace.deployments.length})
      </h2>

      <table className="w-full">

        <thead>

          <tr className="border-b border-slate-700">

            <th className="text-left py-3">
              Name
            </th>

            <th className="text-left py-3">
              Ready
            </th>

          </tr>

        </thead>

        <tbody>

          {namespace.deployments.map((deployment: any) => (

            <tr
              key={deployment.name}
              className="border-b border-slate-800"
            >

<td className="py-3">
  <button
    onClick={() =>
      navigate(`/deployments/${namespace.name}/${deployment.name}`)
    }
    className="text-blue-400 hover:text-blue-300 hover:underline"
  >
    {deployment.name}
  </button>
</td>
              <td className="py-3 text-green-400">
                {deployment.ready}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  </main>
);
}
