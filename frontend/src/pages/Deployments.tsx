import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDeployments } from "../services/deploymentService";
import Loading from "../components/common/Loading";

interface Deployment {
  name: string;
  namespace: string;
  replicas: number;
  ready_replicas: number;
  available_replicas: number;
  updated_replicas: number;
  strategy: string;
}

export default function Deployments() {
  const [deployments, setDeployments] = useState<Deployment[]>([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchDeployments();
  }, []);

  const fetchDeployments = async () => {
    try {
      const data = await getDeployments();
      setDeployments(data);
    } catch (error) {
      console.error("Failed to fetch deployments:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading text="Loading Deployments..." />;
  }

  return (
    <div className="p-6 text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Deployments
        </h1>

        <button
          onClick={fetchDeployments}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
        >
          Refresh
        </button>
      </div>

      <div className="bg-slate-900 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-800">
            <tr>
              <th className="text-left p-4">Deployment</th>
              <th className="text-left p-4">Namespace</th>
              <th className="text-center p-4">Replicas</th>
              <th className="text-center p-4">Ready</th>
              <th className="text-center p-4">Available</th>
              <th className="text-center p-4">Updated</th>
              <th className="text-center p-4">Strategy</th>
            </tr>
          </thead>

          <tbody>
            {deployments.map((deployment) => (
              <tr
                key={`${deployment.namespace}-${deployment.name}`}
                className="border-t border-slate-700 hover:bg-slate-800 cursor-pointer"
                onClick={() =>
                  navigate(
                    `/deployments/${deployment.namespace}/${deployment.name}`
                  )
                }
              >
                <td className="p-4 font-medium">
                  {deployment.name}
                </td>
                <td className="p-4">
                  {deployment.namespace}
                </td>
                <td className="text-center">
                  {deployment.replicas}
                </td>
                <td className="text-center text-green-400">
                  {deployment.ready_replicas}
                </td>
                <td className="text-center text-blue-400">
                  {deployment.available_replicas}
                </td>
                <td className="text-center">
                  {deployment.updated_replicas}
                </td>
                <td className="text-center">
                  {deployment.strategy}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
