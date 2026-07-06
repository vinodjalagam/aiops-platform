import { RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Loading from "../components/common/Loading";
import { useCluster } from "../hooks/useCluster";
export default function Cluster() {
  const {
    cluster,
    loading,
    refresh,
  } = useCluster();
const navigate = useNavigate();

  if (loading) {
    return <Loading text="Loading Cluster..." />;
  }

  if (!cluster) {
    return (
      <main className="flex-1 bg-slate-950 flex items-center justify-center">
        <h1 className="text-white text-2xl">
          Failed to load cluster information
        </h1>
      </main>
    );
  }

  return (
    <main className="flex-1 bg-slate-950 p-8">

      {/* Header */}

      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-4xl font-bold text-white">
            Cluster
          </h1>

          <p className="text-slate-400 mt-2">
            Kubernetes Cluster Overview
          </p>

        </div>

        <button
          onClick={refresh}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg text-white transition"
        >
          <RefreshCw size={18} />
          Refresh
        </button>

      </div>

      {/* Overview */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <p className="text-slate-400">Cluster Name</p>

          <h2 className="text-2xl font-bold text-white mt-2">
            {cluster.cluster_name}
          </h2>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <p className="text-slate-400">Kubernetes Version</p>

          <h2 className="text-2xl font-bold text-white mt-2">
            {cluster.kubernetes_version}
          </h2>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <p className="text-slate-400">Nodes</p>

          <h2 className="text-2xl font-bold text-white mt-2">
            {cluster.nodes.ready}/{cluster.nodes.total}
          </h2>
        </div>

<div className="bg-slate-900 border border-slate-800 rounded-xl p-6">

  <p className="text-slate-400">
    Cluster Health
  </p>

  <h2
    className={
      cluster.health === "Healthy"
        ? "text-green-400 text-2xl font-bold mt-2"
        : "text-yellow-400 text-2xl font-bold mt-2"
    }
  >
    {cluster.health}
  </h2>

  <p className="text-slate-400 mt-3">
    {cluster.healthy_components} / {cluster.total_components} Components Running
  </p>

</div>
      </div>

      {/* Resource Summary */}

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 mb-8">

        <h2 className="text-2xl font-bold text-white mb-6">
          Resource Summary
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

<div
  onClick={() => navigate("/pods")}
  className="bg-slate-800 rounded-lg p-5 cursor-pointer hover:bg-slate-700 hover:scale-105 transition"
>
  <p className="text-slate-400">Pods</p>
  <h3 className="text-3xl text-white font-bold mt-2">
    {cluster.resources.pods}
  </h3>
</div>

<div
  onClick={() => navigate("/deployments")}
  className="bg-slate-800 rounded-lg p-5 cursor-pointer hover:bg-slate-700 hover:scale-105 transition"
>
  <p className="text-slate-400">Deployments</p>
  <h3 className="text-3xl text-white font-bold mt-2">
    {cluster.resources.deployments}
  </h3>
</div>

<div
  onClick={() => navigate("/services")}
  className="bg-slate-800 rounded-lg p-5 cursor-pointer hover:bg-slate-700 hover:scale-105 transition"
>
  <p className="text-slate-400">Services</p>
  <h3 className="text-3xl text-white font-bold mt-2">
    {cluster.resources.services}
  </h3>
</div>

<div
  onClick={() => navigate("/namespaces")}
  className="bg-slate-800 rounded-lg p-5 cursor-pointer hover:bg-slate-700 hover:scale-105 transition"
>
  <p className="text-slate-400">Namespaces</p>
  <h3 className="text-3xl text-white font-bold mt-2">
    {cluster.resources.namespaces}
  </h3>
</div>
        </div>

      </div>

      {/* Control Plane */}

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">

        <h2 className="text-2xl font-bold text-white mb-6">
          Control Plane Components
        </h2>

        <table className="w-full">

          <thead>

            <tr className="border-b border-slate-800">

              <th className="text-left py-3 text-slate-300">
                Component
              </th>

              <th className="text-left py-3 text-slate-300">
                Status
              </th>

            </tr>

          </thead>

          <tbody>

            {cluster.components.map((component) => (

              <tr
                key={component.name}
                className="border-b border-slate-800"
              >

<td className="py-4 font-medium text-white">
  {component.name}
</td>
<td className="py-4">

  <span
    className={
      component.status === "Running"
        ? "bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm"
        : component.status === "Pending"
        ? "bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-sm"
        : "bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-sm"
    }
  >
    {component.status}
  </span>

</td>
              </tr>

            ))}

          </tbody>

        </table>

      </div>
{/* Node Summary */}

<div className="bg-slate-900 border border-slate-800 rounded-xl p-6 mt-8">

  <h2 className="text-2xl font-bold text-white mb-6">
    Node Summary
  </h2>

  <table className="w-full">

    <thead>

      <tr className="border-b border-slate-800">

        <th className="text-left py-3 text-slate-300">
          Node
        </th>

        <th className="text-left py-3 text-slate-300">
          Role
        </th>

        <th className="text-left py-3 text-slate-300">
          Status
        </th>

        <th className="text-left py-3 text-slate-300">
          Version
        </th>

      </tr>

    </thead>

    <tbody>

      {cluster.node_summary.map((node) => (

        <tr
          key={node.name}
          onClick={() =>
            navigate(`/nodes/${node.name}`)
          }
          className="border-b border-slate-800 hover:bg-slate-800 cursor-pointer"
        >

          <td className="py-4 text-white font-medium">
            {node.name}
          </td>

          <td className="py-4 text-slate-300">
            {node.role}
          </td>

          <td className="py-4">

            <span
              className={
                node.status === "Ready"
                  ? "bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm"
                  : "bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-sm"
              }
            >
              {node.status}
            </span>

          </td>

          <td className="py-4 text-slate-300">
            {node.version}
          </td>

        </tr>

      ))}

    </tbody>

  </table>

</div>
    </main>
  );
}
