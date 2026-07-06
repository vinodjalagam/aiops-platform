import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../components/common/Loading";
import {
  getDeployment,
  updateDeploymentImage,
  scaleDeployment,
  deleteDeployment,
} from "../services/deploymentService";
interface Container {
  name: string;
  image: string;
  ports: number[];
}

interface Deployment {
  name: string;
  namespace: string;
  replicas: number;
  ready_replicas: number;
  available_replicas: number;
  updated_replicas: number;
  strategy: string;
  labels: Record<string, string>;
  selector: Record<string, string>;
  containers: Container[];
}

export default function DeploymentDetails() {
  const navigate = useNavigate();
  const { namespace, name } = useParams();

  const [deployment, setDeployment] =
    useState<Deployment | null>(null);

  const [newImage, setNewImage] = useState("");
  const [replicas, setReplicas] = useState(0);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (namespace && name) {
      loadDeployment(namespace, name);
    }
  }, [namespace, name]);

  const loadDeployment = async (
    namespace: string,
    name: string
  ) => {
    const data = await getDeployment(namespace, name);
    setDeployment(data);
    setReplicas(data.replicas);
  };

  const handleUpdateImage = async () => {

    if (!namespace || !name) return;

    if (!newImage.trim()) {
      alert("Please enter a new image.");
      return;
    }

    try {

      setLoading(true);

      await updateDeploymentImage(
        namespace,
        name,
        newImage
      );

      await loadDeployment(namespace, name);

      alert("Deployment image updated successfully.");

      setNewImage("");

    } catch (err) {

      console.error(err);

      alert("Failed to update image.");

    } finally {

      setLoading(false);

    }

  };

  const handleScaleDeployment = async () => {

    if (!namespace || !name) return;

    try {

      setLoading(true);

      await scaleDeployment(
        namespace,
        name,
        replicas
      );

      await loadDeployment(namespace, name);

      alert("Deployment scaled successfully.");

    } catch (err) {

      console.error(err);

      alert("Scaling failed.");

    } finally {

      setLoading(false);

    }

  };
  
  const handleDeleteDeployment = async () => {

  if (!namespace || !name) return;

  const confirmed = window.confirm(
    `Delete deployment "${name}"?`
  );

  if (!confirmed) return;

  try {

    setLoading(true);

    await deleteDeployment(
      namespace,
      name
    );

    alert("Deployment deleted successfully.");

    navigate("/deployments");

  } catch (error) {

    console.error(error);

    alert("Failed to delete deployment.");

  } finally {

    setLoading(false);

  }

};
  
if (!deployment) {
    return <Loading text="Loading Deployment..." />;
}

  return (
    <div className="p-6 text-white">

      <div className="flex justify-between items-center mb-6">

        <div>

          <h1 className="text-3xl font-bold">
            Deployment Details
          </h1>

          <p className="text-slate-400 mt-1">
            {deployment.namespace} / {deployment.name}
          </p>

        </div>

        <button
          onClick={() => navigate("/deployments")}
          className="bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-lg"
        >
          Back
        </button>

      </div>

      <div className="space-y-6">

        {/* Overview */}

        <div className="bg-slate-900 rounded-xl border border-slate-700 p-6">

          <h2 className="text-xl font-semibold mb-4">
            Overview
          </h2>

          <div className="grid grid-cols-2 gap-4">

            <p>
              <strong>Name:</strong> {deployment.name}
            </p>

            <p>
              <strong>Namespace:</strong> {deployment.namespace}
            </p>

            <p>
              <strong>Strategy:</strong> {deployment.strategy}
            </p>

          </div>

        </div>

        {/* Replica Status */}

        <div className="bg-slate-900 rounded-xl border border-slate-700 p-6">

          <h2 className="text-xl font-semibold mb-4">
            Replica Status
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

            <div>
              <p className="text-slate-400">
                Desired
              </p>

              <p className="text-2xl font-bold">
                {deployment.replicas}
              </p>
            </div>

            <div>
              <p className="text-slate-400">
                Ready
              </p>

              <p className="text-2xl font-bold text-green-400">
                {deployment.ready_replicas}
              </p>
            </div>

            <div>
              <p className="text-slate-400">
                Available
              </p>

              <p className="text-2xl font-bold text-blue-400">
                {deployment.available_replicas}
              </p>
            </div>

            <div>
              <p className="text-slate-400">
                Updated
              </p>

              <p className="text-2xl font-bold text-yellow-400">
                {deployment.updated_replicas}
              </p>
            </div>

          </div>

        </div>

        {/* Labels */}

        <div className="bg-slate-900 rounded-xl border border-slate-700 p-6">

          <h2 className="text-xl font-semibold mb-4">
            Labels
          </h2>

          <div className="flex flex-wrap gap-3">

            {Object.entries(deployment.labels).map(
              ([key, value]) => (

                <span
                  key={key}
                  className="bg-blue-900/40 border border-blue-600 px-3 py-2 rounded-lg"
                >
                  {key}: {value}
                </span>

              )
            )}

          </div>

        </div>

        {/* Selector */}

        <div className="bg-slate-900 rounded-xl border border-slate-700 p-6">

          <h2 className="text-xl font-semibold mb-4">
            Selector
          </h2>

          <div className="flex flex-wrap gap-3">

            {Object.entries(deployment.selector).map(
              ([key, value]) => (

                <span
                  key={key}
                  className="bg-green-900/40 border border-green-600 px-3 py-2 rounded-lg"
                >
                  {key}: {value}
                </span>

              )
            )}

          </div>

        </div>

        {/* Containers */}

        <div className="bg-slate-900 rounded-xl border border-slate-700 p-6">

          <h2 className="text-xl font-semibold mb-6">
            Containers
          </h2>

          {deployment.containers.map((container) => (

            <div
              key={container.name}
              className="border border-slate-700 rounded-lg p-5 mb-5"
            >

              <p>
                <strong>Name:</strong> {container.name}
              </p>

              <p className="mt-2">
                <strong>Image:</strong> {container.image}
              </p>

              <p className="mt-2">
                <strong>Ports:</strong>{" "}
                {container.ports.length
                  ? container.ports.join(", ")
                  : "None"}
              </p>

            </div>

          ))}

        </div>
        {/* Deployment Actions */}

        <div className="bg-slate-900 rounded-xl border border-slate-700 p-6">

          <h2 className="text-2xl font-bold mb-6">
            Deployment Actions
          </h2>

          {/* Update Image */}

          <div className="mb-8">

            <h3 className="text-lg font-semibold mb-3">
              Update Image
            </h3>

            <p className="text-slate-400 mb-2">
              Current Image
            </p>

            <div className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 mb-4">
              {deployment.containers[0]?.image}
            </div>

            <input
              type="text"
              placeholder="Example: nginx:1.27"
              value={newImage}
              onChange={(e) =>
                setNewImage(e.target.value)
              }
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white"
            />

            <button
              onClick={handleUpdateImage}
              disabled={loading}
              className="mt-4 bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg"
            >
              {loading
                ? "Updating..."
                : "Update Image"}
            </button>

          </div>

          <hr className="border-slate-700 my-8" />

          {/* Scale Deployment */}

          <div className="mb-8">

            <h3 className="text-lg font-semibold mb-3">
              Scale Deployment
            </h3>

            <p className="text-slate-400 mb-2">
              Current Replicas
            </p>

            <div className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 mb-4">
              {deployment.replicas}
            </div>

            <input
              type="number"
              min="0"
              value={replicas}
              onChange={(e) =>
                setReplicas(Number(e.target.value))
              }
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white"
            />

            <button
              onClick={handleScaleDeployment}
              disabled={loading}
              className="mt-4 bg-green-600 hover:bg-green-700 px-6 py-2 rounded-lg"
            >
              {loading
                ? "Scaling..."
                : "Scale Deployment"}
            </button>

          </div>

          <hr className="border-red-800 my-8" />

          {/* Danger Zone */}

          <div>

            <h3 className="text-xl font-bold text-red-500 mb-4">
              Danger Zone
            </h3>

            <p className="text-slate-400 mb-4">
              Delete this deployment permanently.
            </p>

	    <button
  onClick={handleDeleteDeployment}
  disabled={loading}
  className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg"
>
  {loading
    ? "Deleting..."
    : "Delete Deployment"}
	  </button>
          </div>

        </div>

      </div>

    </div>

  );

}
