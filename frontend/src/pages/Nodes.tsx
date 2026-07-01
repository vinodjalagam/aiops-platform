import { useNodes } from "../hooks/useNodes";
import { useNavigate } from "react-router-dom";
import Loading from "../components/common/Loading";
export default function Nodes() {
  const { nodes, loading } = useNodes();
  const navigate = useNavigate();

if (loading) {
    return <Loading text="Loading Nodes..." />;
}
  return (
    <main className="flex-1 bg-slate-950 p-6">
      <h1 className="text-3xl font-bold text-white mb-6">
        Kubernetes Nodes
      </h1>

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
            {nodes.map((node) => (
            <tr
  key={node.name}
  onClick={() =>
    navigate(`/nodes/${node.name}`)
  }
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
		
		))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
