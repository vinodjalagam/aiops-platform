import { useParams } from "react-router-dom";
import { RefreshCw, Search } from "lucide-react";
import Loading from "../components/common/Loading";
import { useLogs } from "../hooks/useLogs";
import { useEffect, useState } from "react";
export default function PodLogs() {
  const { namespace, name } = useParams();

  const [tailLines, setTailLines] = useState(100);
  const [search, setSearch] = useState("");

  const {
    logs,
    loading,
    refresh,
  } = useLogs(
    namespace || "",
    name || "",
    tailLines
  );

useEffect(() => {

  const timer = setInterval(() => {

    refresh();

  }, 5000);

  return () => clearInterval(timer);

}, [refresh]);

  if (loading) {
    return <Loading text="Loading Logs..." />;
  }

  if (!logs) {
    return (
      <main className="flex-1 bg-slate-950 flex items-center justify-center">
        <h1 className="text-white text-2xl">
          Failed to load logs
        </h1>
      </main>
    );
  }

  const filteredLogs = logs.logs
    .split("\n")
    .filter((line) =>
      line.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <main className="flex-1 bg-slate-950 p-8">

      <div className="flex justify-between items-center mb-6">

        <div>

          <h1 className="text-3xl font-bold text-white">
            Pod Logs
          </h1>

          <p className="text-slate-400 mt-2">
            {logs.namespace} / {logs.pod}
          </p>

        </div>

        <button
          onClick={refresh}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white"
        >
          <RefreshCw size={18} />
          Refresh
        </button>
<button
  onClick={() =>
    navigator.clipboard.writeText(logs.logs)
  }
  className="bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-lg text-white"
>
  Copy
</button>

<button
  onClick={() => {
    const blob = new Blob([logs.logs], {
      type: "text/plain",
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = `${logs.pod}.log`;

    a.click();

    URL.revokeObjectURL(url);
  }}
  className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-white"
>
  Download
</button>

      </div>

      <div className="flex gap-4 mb-6">

        <div className="relative flex-1">

          <Search
            className="absolute left-3 top-3 text-slate-400"
            size={18}
          />

          <input
            type="text"
            placeholder="Search Logs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-10 pr-4 py-3 text-white"
          />

        </div>

        <select
          value={tailLines}
          onChange={(e) =>
            setTailLines(Number(e.target.value))
          }
          className="bg-slate-900 border border-slate-800 rounded-lg px-4 text-white"
        >
          <option value={50}>50 Lines</option>
          <option value={100}>100 Lines</option>
          <option value={500}>500 Lines</option>
        </select>

      </div>

      <div className="bg-black rounded-xl border border-slate-800 p-6 h-[600px] overflow-auto">

<div className="font-mono text-sm">

  {filteredLogs.map((line, index) => (

    <div
      key={index}
      className={
        line.includes("ERROR")
          ? "text-red-400"
          : line.includes("WARN")
          ? "text-yellow-400"
          : "text-green-400"
      }
    >
      {line}
    </div>

  ))}

</div>
      </div>

    </main>
  );
}
