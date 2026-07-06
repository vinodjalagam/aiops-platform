import { useNavigate } from "react-router-dom";
import { useNodes } from "../hooks/useNodes";
import { useState } from "react";
import { Search } from "lucide-react";
import Loading from "../components/common/Loading";
export default function Nodes() {
  const { nodes, loading } = useNodes();
  
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
const filteredNodes = nodes.filter((node) =>
  node.name.toLowerCase().includes(search.toLowerCase()) ||
  node.role.toLowerCase().includes(search.toLowerCase()) ||
  node.status.toLowerCase().includes(search.toLowerCase()) ||
  node.version.toLowerCase().includes(search.toLowerCase())
);

if (loading) {
    return <Loading text="Loading Nodes..." />;
}
  return (
    <main className="flex-1 bg-slate-950 p-6">
      <h1 className="text-3xl font-bold text-white mb-6">
        Kubernetes Nodes
      </h1>
{/* Search */}

<div className="relative mb-6">

  <Search
    className="absolute left-3 top-3 text-slate-400"
    size={18}
  />

  <input
    type="text"
    placeholder="Search Nodes..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-10 pr-4 py-2 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
  />

</div>

      <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-800">
            <tr>
              <th className="text-left p-4 text-slate-300">Name</th>
              <th className="text-left p-4 text-slate-300">Role</th>
              <th className="text-left p-4 text-slate-300">Status</th>
              <th className="text-left p-4 text-slate-300">Version</th>
            </tr>
          </thead>
<tbody>

  {filteredNodes.length > 0 ? (

    filteredNodes.map((node) => (

      <tr
        key={node.name}
        onClick={() => navigate(`/nodes/${node.name}`)}
        className="border-t border-slate-800 hover:bg-slate-800 cursor-pointer"
      >

        <td className="p-4 text-white">
          {node.name}
        </td>

        <td className="p-4 text-slate-300">
          {node.role}
        </td>

        <td
          className={`p-4 ${
            node.status === "Ready"
              ? "text-green-400"
              : "text-red-400"
          }`}
        >
          {node.status}
        </td>

        <td className="p-4 text-slate-300">
          {node.version}
        </td>

      </tr>

    ))

  ) : (

    <tr>

      <td
        colSpan={4}
        className="text-center py-8 text-slate-400"
      >
        No Nodes Found
      </td>

    </tr>

  )}

</tbody>

        </table>
      </div>
    </main>
  );
}
