import { RefreshCw } from "lucide-react";
import Loading from "../components/common/Loading";
import { useMetrics } from "../hooks/useMetrics";
import { useNavigate } from "react-router-dom";

export default function Metrics() {
  const {
    metrics,
    loading,
    refresh,
  } = useMetrics();

const navigate = useNavigate();
  if (loading) {
    return <Loading text="Loading Metrics..." />;
  }

  if (!metrics) {
    return (
      <main className="flex-1 bg-slate-950 flex items-center justify-center">
        <h1 className="text-white text-2xl">
          Failed to load metrics
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
          Metrics
        </h1>

        <p className="text-slate-400 mt-2">
          Live Cluster Resource Usage
        </p>

      </div>

      <button
        onClick={refresh}
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg text-white"
      >
        <RefreshCw size={18} />
        Refresh
      </button>

    </div>

    {/* Summary */}

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

      {/* CPU */}

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">

        <p className="text-slate-400">
          CPU Usage
        </p>

        <h2 className="text-4xl text-white font-bold mt-3">
          {metrics.cpu.percentage}%
        </h2>

        <p className="text-slate-400 mt-2">
          {metrics.cpu.used} / {metrics.cpu.total} Cores
        </p>

        <div className="w-full bg-slate-700 rounded-full h-2 mt-4">

          <div
            className="bg-blue-500 h-2 rounded-full"
            style={{
              width: `${metrics.cpu.percentage}%`,
            }}
          />

        </div>

      </div>

      {/* Memory */}

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">

        <p className="text-slate-400">
          Memory Usage
        </p>

        <h2 className="text-4xl text-white font-bold mt-3">
          {metrics.memory.percentage}%
        </h2>

        <p className="text-slate-400 mt-2">
          {metrics.memory.used} / {metrics.memory.total} GiB
        </p>

        <div className="w-full bg-slate-700 rounded-full h-2 mt-4">

          <div
            className="bg-green-500 h-2 rounded-full"
            style={{
              width: `${metrics.memory.percentage}%`,
            }}
          />

        </div>

      </div>

    </div>

    {/* Node Metrics */}

    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">

      <table className="w-full">

        <thead className="bg-slate-800">

          <tr>

            <th className="text-left p-4 text-slate-300">
              Node
            </th>

            <th className="text-left p-4 text-slate-300">
              CPU (m)
            </th>

            <th className="text-left p-4 text-slate-300">
              Memory (GiB)
            </th>

          </tr>

        </thead>

        <tbody>

          {metrics.nodes.length > 0 ? (

            metrics.nodes.map((node) => (

              <tr
                key={node.name}
                onClick={() => navigate(`/nodes/${node.name}`)}
                className="border-t border-slate-800 hover:bg-slate-800 cursor-pointer"
              >

                <td className="p-4 text-white">
                  {node.name}
                </td>

                <td className="p-4 text-green-400">
                  {Math.round(node.cpu_m)} m
                </td>

                <td className="p-4 text-blue-400">
                  {(node.memory_mi / 1024).toFixed(2)} GiB
                </td>

              </tr>

            ))

          ) : (

            <tr>

              <td
                colSpan={3}
                className="text-center py-8 text-slate-400"
              >
                No Metrics Available
              </td>

            </tr>

          )}

        </tbody>

      </table>

    </div>

  </main>
);
}
