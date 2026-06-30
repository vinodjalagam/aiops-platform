import { useParams } from "react-router-dom";
import { useNamespace } from "../hooks/useNamespace";

export default function NamespaceDetails() {
  const { name } = useParams();

  const { namespace, loading } = useNamespace(name!);

  if (loading) {
    return (
      <div className="p-8 text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-8 bg-slate-950 min-h-screen text-white">

      <h1 className="text-4xl font-bold mb-6">
        {namespace.name}
      </h1>

      <pre className="bg-slate-900 p-6 rounded-lg overflow-auto">
        {JSON.stringify(namespace, null, 2)}
      </pre>

    </div>
  );
}
