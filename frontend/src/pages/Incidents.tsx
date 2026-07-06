import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RefreshCw, Search } from "lucide-react";
import Loading from "../components/common/Loading";
import { useIncidents } from "../hooks/useIncidents";

export default function Incidents() {
  const {
    incidents,
    loading,
    refresh,
  } = useIncidents();

  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const filtered = incidents.filter((incident) =>
    incident.pod.toLowerCase().includes(search.toLowerCase()) ||
    incident.namespace.toLowerCase().includes(search.toLowerCase()) ||
    incident.reason.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <Loading text="Loading Incidents..." />;
  }

  return (
    <main className="flex-1 bg-slate-950 p-8">

      {/* Header */}

      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-4xl font-bold text-white">
            Incidents
          </h1>

          <p className="text-slate-400 mt-2">
            Kubernetes Cluster Incidents
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

      {/* Search */}

      <div className="relative mb-6">

        <Search
          className="absolute left-3 top-3 text-slate-400"
          size={18}
        />

        <input
          type="text"
          placeholder="Search Incident..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-10 pr-4 py-3 text-white"
        />

      </div>

      {/* Table */}

      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-800">

            <tr>

              <th className="text-left p-4">Severity</th>
              <th className="text-left p-4">Namespace</th>
              <th className="text-left p-4">Pod</th>
              <th className="text-left p-4">Reason</th>
              <th className="text-left p-4">Message</th>

            </tr>

          </thead>

          <tbody>

            {filtered.length > 0 ? (

              filtered.map((incident) => (

                <tr
                  key={`${incident.namespace}-${incident.pod}-${incident.reason}`}
                  onClick={() =>
                    navigate(
                      `/pods/${incident.namespace}/${incident.pod}`
                    )
                  }
                  className="border-t border-slate-800 hover:bg-slate-800 cursor-pointer"
                >

                  <td className="p-4">

                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        incident.severity === "Critical"
                          ? "bg-red-500/20 text-red-400"
                          : "bg-yellow-500/20 text-yellow-400"
                      }`}
                    >
                      {incident.severity}
                    </span>

                  </td>

                  <td className="p-4 text-white">
                    {incident.namespace}
                  </td>

                  <td className="p-4 text-white">
                    {incident.pod}
                  </td>

                  <td className="p-4 text-white">
                    {incident.reason}
                  </td>

                  <td className="p-4 text-slate-400">
                    {incident.message}
                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan={5}
                  className="text-center py-8 text-slate-400"
                >
                  No Incidents Found
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </main>
  );
}
