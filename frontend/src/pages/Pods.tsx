import { useNavigate } from "react-router-dom";
import { usePods } from "../hooks/usePods";
import { useState } from "react";
import Loading from "../components/common/Loading";
import { Search } from "lucide-react";
export default function Pods() {

  const navigate = useNavigate();

  const {
    pods,
    loading,
  } = usePods();
const [search, setSearch] = useState("");
if (loading) {
  return <Loading text="Loading Pods..." />;
}
const filteredPods = pods.filter((pod) =>
  pod.name.toLowerCase().includes(search.toLowerCase()) ||
  pod.namespace.toLowerCase().includes(search.toLowerCase()) ||
  pod.status.toLowerCase().includes(search.toLowerCase()) ||
  (pod.node ?? "").toLowerCase().includes(search.toLowerCase())
);
  return (
    <main className="flex-1 bg-slate-950 p-6">

<h1 className="text-3xl font-bold text-white mb-6">
  Kubernetes Pods
</h1>
{/* Search */}

<div className="relative mb-6">

  <Search
    className="absolute left-3 top-3 text-slate-400"
    size={18}
  />

  <input
    type="text"
    placeholder="Search Pods..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-10 pr-4 py-2 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
  />

</div>
<div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
    <table className="w-full">
          <thead className="bg-slate-800">

            <tr>

              <th className="text-left p-4 text-slate-300">
                Pod
              </th>

              <th className="text-left p-4 text-slate-300">
                Namespace
              </th>

              <th className="text-left p-4 text-slate-300">
                Status
              </th>

              <th className="text-left p-4 text-slate-300">
                Node
              </th>

            </tr>

          </thead>

<tbody>

  {filteredPods.length > 0 ? (

    filteredPods.map((pod) => (

      <tr
        key={pod.namespace + pod.name}
        className="border-t border-slate-800 hover:bg-slate-800"
      >

        <td
          className="p-4 text-blue-400 cursor-pointer hover:underline"
          onClick={() =>
            navigate(
              `/pods/${pod.namespace}/${pod.name}`
            )
          }
        >
          {pod.name}
        </td>

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

    ))

  ) : (

    <tr>

      <td
        colSpan={4}
        className="text-center py-8 text-slate-400"
      >
        No Pods Found
      </td>

    </tr>

  )}

</tbody>
        </table>

      </div>

    </main>
  );
}
