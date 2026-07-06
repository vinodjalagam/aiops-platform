import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../components/common/Loading";
import {
  getNode,
  type NodeDetails,
} from "../services/nodeService";

export default function NodeDetails() {

  const navigate = useNavigate();

  const { name } = useParams();

  const [node, setNode] =
    useState<NodeDetails | null>(null);

  useEffect(() => {

    if (name) {

      loadNode(name);

    }

  }, [name]);

  const loadNode = async (
    name: string,
  ) => {

    try {

      const data = await getNode(name);

      setNode(data);

    } catch (error) {

      console.error(error);

    }

  };

if (!node) {
    return <Loading text="Loading Node..." />;
}
  return (

    <main className="flex-1 bg-slate-950 p-6">

      <div className="flex justify-between items-center mb-6">

        <div>

          <h1 className="text-3xl font-bold text-white">
            Node Details
          </h1>

          <p className="text-slate-400 mt-1">
            {node.name}
          </p>

        </div>

        <button
          onClick={() => navigate("/nodes")}
          className="bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-lg text-white"
        >
          Back
        </button>

      </div>

      {/* Overview */}

      <div className="bg-slate-900 rounded-xl border border-slate-700 p-6 mb-6">

        <h2 className="text-xl font-semibold text-white mb-4">
          Overview
        </h2>

        <div className="grid grid-cols-2 gap-6">

          <div>

            <p className="text-slate-400">
              Status
            </p>

            <span
className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-semibold ${
  node.status === "Ready"
    ? "bg-green-500/20 text-green-400"
    : "bg-red-500/20 text-red-400"
}`}
>
  {node.status}
            </span>
          </div>

          <div>

            <p className="text-slate-400">
              Kubernetes Version
            </p>

            <p className="text-white">
              {node.kubelet_version}
            </p>

          </div>

          <div>

            <p className="text-slate-400">
              Operating System
            </p>

            <p className="text-white">
              {node.os_image}
            </p>

          </div>

          <div>

            <p className="text-slate-400">
              Container Runtime
            </p>

            <p className="text-white">
              {node.container_runtime}
            </p>

          </div>

          <div>

            <p className="text-slate-400">
              Kernel Version
            </p>

            <p className="text-white">
              {node.kernel_version}
            </p>

          </div>

        </div>

      </div>

      {/* Capacity */}

      <div className="bg-slate-900 rounded-xl border border-slate-700 p-6 mb-6">

        <h2 className="text-xl font-semibold text-white mb-4">
          Capacity
        </h2>

        <div className="grid grid-cols-3 gap-6">

          <div>

            <p className="text-slate-400">
              CPU
            </p>

            <p className="text-white">
              {node.capacity.cpu}
            </p>

          </div>

          <div>

            <p className="text-slate-400">
              Memory
            </p>

            <p className="text-white">
              {node.capacity.memory}
            </p>

          </div>

          <div>

            <p className="text-slate-400">
              Pods
            </p>

            <p className="text-white">
              {node.capacity.pods}
            </p>

          </div>

        </div>

      </div>

{/* Root Cause */}

{node.status === "Not Ready" && (

  <div className="bg-red-950 border border-red-700 rounded-xl p-6 mb-6">

    <h2 className="text-xl font-bold text-red-400 mb-6">
      🚨 Root Cause Analysis
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

      <div>

        <p className="text-slate-400">
          Reason
        </p>

        <p className="text-white font-semibold mt-1">
          {node.ready_reason || "Unknown"}
        </p>

      </div>

      <div>

        <p className="text-slate-400">
          Kubernetes Message
        </p>

        <p className="text-white mt-1">
          {node.ready_message || "No message available"}
        </p>

      </div>

    </div>

    <div className="mt-6">

<h3 className="text-lg font-semibold text-white mb-3">
  {node.diagnosis.title}
</h3>

<p className="text-slate-300 mb-4">
  {node.diagnosis.explanation}
</p>

<div className="mb-4">
  <span
    className={`px-3 py-1 rounded-full text-sm font-semibold ${
      node.diagnosis.severity === "Critical"
        ? "bg-red-500/20 text-red-400"
        : node.diagnosis.severity === "Warning"
        ? "bg-yellow-500/20 text-yellow-400"
        : "bg-blue-500/20 text-blue-400"
    }`}
  >
    {node.diagnosis.severity}
  </span>
</div>

<h4 className="text-white font-semibold mb-2">
  Recommended Actions
</h4>

<ul className="list-disc ml-5 space-y-2 text-slate-200">

  {node.diagnosis.recommended_actions.map((action) => (

    <li key={action}>
      {action}
    </li>

  ))}

</ul>

    </div>

  </div>

)}      

{/* Allocatable */}

      <div className="bg-slate-900 rounded-xl border border-slate-700 p-6">

        <h2 className="text-xl font-semibold text-white mb-4">
          Allocatable
        </h2>

        <div className="grid grid-cols-3 gap-6">

          <div>

            <p className="text-slate-400">
              CPU
            </p>

            <p className="text-white">
              {node.allocatable.cpu}
            </p>

          </div>

          <div>

            <p className="text-slate-400">
              Memory
            </p>

            <p className="text-white">
              {node.allocatable.memory}
            </p>

          </div>

          <div>

            <p className="text-slate-400">
              Pods
            </p>

            <p className="text-white">
              {node.allocatable.pods}
            </p>

          </div>

        </div>

      </div>


      {/* Node Conditions */}

      <div className="bg-slate-900 rounded-xl border border-slate-700 p-6 mt-6">

        <h2 className="text-xl font-semibold text-white mb-6">
          Node Conditions
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

          {node.conditions.map((condition) => (

            <div
              key={condition.type}
              className="border border-slate-700 rounded-lg p-4"
            >

              <p className="text-slate-400">
                {condition.type}
              </p>

              <span
                className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-semibold ${condition.status === "True"
                    ? "bg-green-500/20 text-green-400"
                    : "bg-red-500/20 text-red-400"
                  }`}
              >
                {condition.status === "True"
                  ? "Healthy"
                  : "Unhealthy"}
              </span>

            </div>

          ))}

        </div>

      </div>

      {/* Labels */}

      <div className="bg-slate-900 rounded-xl border border-slate-700 p-6 mt-6">

        <h2 className="text-xl font-semibold text-white mb-6">
          Labels
        </h2>

        <div className="space-y-3">

          {node.labels.map((label) => (

            <div
              key={label.key}
              className="flex justify-between border-b border-slate-800 pb-2"
            >

              <span className="text-blue-400">
                {label.key}
              </span>

              <span className="text-slate-300">
                {label.value}
              </span>

            </div>

          ))}

        </div>

      </div>

      {/* Taints */}

      <div className="bg-slate-900 rounded-xl border border-slate-700 p-6 mt-6">

        <h2 className="text-xl font-semibold text-white mb-6">
          Taints
        </h2>

        {node.taints.length === 0 ? (

          <p className="text-slate-400">
            No taints configured.
          </p>

        ) : (

          <div className="space-y-3">

            {node.taints.map((taint, index) => (

              <div
                key={index}
                className="border border-slate-700 rounded-lg p-4"
              >

                <p className="text-blue-400">
                  {taint.key}
                </p>

                <p className="text-slate-300 mt-2">
                  {taint.value || "-"}
                </p>

                <p className="text-yellow-400 mt-2">
                  {taint.effect}
                </p>

              </div>

            ))}

          </div>

        )}

      </div>

      {/* Running Pods */}


      <div className="bg-slate-900 rounded-xl border border-slate-700 p-6 mt-6">

        <h2 className="text-xl font-semibold text-white mb-6">
          Running Pods
        </h2>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="border-b border-slate-700">

                <th className="text-left py-3">
                  Pod
                </th>

                <th className="text-left py-3">
                  Namespace
                </th>

                <th className="text-left py-3">
                  Status
                </th>

              </tr>

            </thead>

            <tbody>

              {node.running_pods.map((pod) => (

                <tr
                  key={pod.namespace + pod.name}
                  className="border-b border-slate-800"
                >


                  <td className="py-3">

                    <button
                      onClick={() =>
                        navigate(`/pods/${pod.namespace}/${pod.name}`)
                      }
                      className="text-blue-400 hover:text-blue-300 hover:underline"
                    >
                      {pod.name}
                    </button>

                  </td>
                  <td className="py-3 text-slate-300">
                    {pod.namespace}
                  </td>

                  <td
                    className={`py-3 ${pod.status === "Running"
                        ? "text-green-400"
                        : "text-yellow-400"
                      }`}
                  >
                    {pod.status}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </main>

  );

}
