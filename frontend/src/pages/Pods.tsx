import { usePods } from "../hooks/usePods";

export default function Pods() {
  const { pods, loading } = usePods();

  if (loading) {
    return (
      <main className="flex-1 bg-slate-950 flex items-center justify-center">
        <h1 className="text-white text-2xl">Loading Pods...</h1>
      </main>
    );
  }

  return (
    <main className="flex-1 bg-slate-950 p-6">
      <h1 className="text-3xl font-bold text-white mb-6">
        Kubernetes Pods
      </h1>

      <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-800">
            <tr>
              <th className="text-left p-4 text-slate-300">Pod</th>
              <th className="text-left p-4 text-slate-300">Namespace</th>
              <th className="text-left p-4 text-slate-300">Status</th>
              <th className="text-left p-4 text-slate-300">Node</th>
            </tr>
          </thead>

          <tbody>
            {pods.map((pod) => (
              <tr
                key={pod.namespace + pod.name}
                className="border-t border-slate-800 hover:bg-slate-800"
              >
                <td className="p-4 text-white">{pod.name}</td>

                <td className="p-4 text-slate-300">
                  {pod.namespace}
                </td>

                <td
                  className={`p-4 ${
                    pod.status === "Running"
                      ? "text-green-400"
                      : "text-yellow-400"
                  }`}
                >
                  {pod.status}
                </td>

                <td className="p-4 text-slate-300">
                  {pod.node}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
