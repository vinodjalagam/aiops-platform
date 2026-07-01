import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RefreshCw, Search } from "lucide-react";
import { useNamespaces } from "../hooks/useNamespaces";
import Loading from "../components/common/Loading";
export default function Namespaces() {
  const {
    namespaces,
    loading,
    refresh,
  } = useNamespaces();

  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const filtered = namespaces.filter((namespace) =>
    namespace.name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

if (loading) {
    return <Loading text="Loading Namespaces..." />;
}
  return (
    <main className="flex-1 bg-slate-950 p-8">

      {/* Header */}

      <div className="flex justify-between items-center mb-8">

        <div>
          <h1 className="text-4xl font-bold text-white">
            Namespaces
          </h1>

          <p className="text-slate-400 mt-2">
            View all Kubernetes namespaces.
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

      {/* Search */}

      <div className="relative mb-6">

        <Search
          className="absolute left-3 top-3 text-slate-400"
          size={18}
        />

        <input
          type="text"
          placeholder="Search Namespace..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-blue-500"
        />

      </div>

      {/* Table */}

      <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-800 text-slate-300">

            <tr>

              <th className="p-4 text-left">Namespace</th>
              <th className="text-left">Status</th>
              <th className="text-left">Pods</th>
              <th className="text-left">Deployments</th>
              <th className="text-left">Services</th>
              <th className="text-left">Created</th>

            </tr>

          </thead>

          <tbody>

            {filtered.map((namespace) => (

              <tr
                key={namespace.name}
                className="border-t border-slate-800 hover:bg-slate-800 transition"
              >

                <td className="p-4">

                  <button
                    onClick={() =>
                      navigate(`/namespaces/${namespace.name}`)
                    }
                    className="text-blue-400 hover:text-blue-300 hover:underline font-semibold"
                  >
                    {namespace.name}
                  </button>

                </td>

                <td>

                  <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm">
                    {namespace.status}
                  </span>

                </td>

                <td className="text-white">
                  {namespace.pods}
                </td>

                <td className="text-white">
                  {namespace.deployments}
                </td>

                <td className="text-white">
                  {namespace.services}
                </td>

                <td className="text-slate-400 text-sm">
                  {new Date(namespace.age).toLocaleString()}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </main>
  );
}
