import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  getPod,
  getPodEvents,
  deletePod,
} from "../services/podService";

interface Container {
  name: string;
  image: string;
  ports: number[];
}

interface Condition {
  type: string;
  status: string;
}

interface PodEvent {
  type: string;
  reason: string;
  message: string;
  count: number;
  first_timestamp: string | null;
  last_timestamp: string | null;
}

interface Health {
  ready: boolean;
  containers_ready: boolean;
  initialized: boolean;
  pod_scheduled: boolean;
  liveness_probe: string;
  readiness_probe: string;
  startup_probe: string;
}

interface Pod {
  name: string;
  namespace: string;
  status: string;
  node: string;
  pod_ip: string;
  host_ip: string;
  qos_class: string;
  restart_count: number;
  containers: Container[];
  conditions: Condition[];
  health: Health;
}
export default function PodDetails() {

  const navigate = useNavigate();

  const { namespace, name } = useParams();

  const [pod, setPod] =
    useState<Pod | null>(null);

  const [logs, setLogs] =
    useState("");
  const [events, setEvents] =
    useState<PodEvent[]>([]);

  const logsRef =
    useRef<HTMLPreElement>(null);

  const loadPod = async (
    namespace: string,
    name: string,
  ) => {

    try {

      const data = await getPod(
        namespace,
        name,
      );

      setPod(data);

    } catch (error) {

      console.error(error);

    }

  };
 const loadEvents = async (
  namespace: string,
  name: string,
) => {

  try {

    const data = await getPodEvents(
      namespace,
      name,
    );

    setEvents(data);

  } catch (error) {

    console.error(error);

  }

};

  useEffect(() => {

    if (!namespace || !name) return;

    loadPod(namespace, name);
    loadEvents(namespace, name);
    const socket = new WebSocket(
      `ws://localhost:8000/ws/logs/${namespace}/${name}`
    );

    socket.onmessage = (event) => {

      setLogs(
        (prev) => prev + event.data + "\n"
      );

    };

    socket.onerror = (error) => {

      console.error(error);

    };

    return () => {

      socket.close();

    };

  }, [namespace, name]);

  useEffect(() => {

    logsRef.current?.scrollTo({

      top: logsRef.current.scrollHeight,

      behavior: "smooth",

    });

  }, [logs]);

  const handleDeletePod = async () => {

    if (!namespace || !name) return;

    const confirmed = window.confirm(
      `Delete pod "${name}"?`
    );

    if (!confirmed) return;

    try {

      await deletePod(
        namespace,
        name,
      );

      alert("Pod deleted successfully.");

      navigate("/pods");

    } catch (error) {

      console.error(error);

      alert("Failed to delete pod.");

    }

  };

  if (!pod) {

    return (

      <main className="flex-1 bg-slate-950 flex items-center justify-center">

        <h1 className="text-white text-2xl">
          Loading Pod Details...
        </h1>

      </main>

    );

  }

  return (

    <main className="flex-1 bg-slate-950 p-8">

      {/* Header */}

      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-4xl font-bold text-white">
            Pod Details
          </h1>

          <p className="text-slate-400 mt-2">
            {pod.namespace} / {pod.name}
          </p>

        </div>

        <button
          onClick={() => navigate("/pods")}
          className="bg-slate-700 hover:bg-slate-600 px-5 py-2 rounded-lg text-white transition"
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

          <div className="grid grid-cols-2 gap-6">

            <div>

              <p className="text-slate-400">
                Name
              </p>

              <p className="text-white font-medium">
                {pod.name}
              </p>

            </div>

            <div>

              <p className="text-slate-400">
                Namespace
              </p>

              <p className="text-white font-medium">
                {pod.namespace}
              </p>

            </div>

            <div>

              <p className="text-slate-400">
                Status
              </p>

              <span
                className={`inline-flex px-3 py-1 rounded-full text-sm font-semibold ${
                  pod.status === "Running"
                    ? "bg-green-500/20 text-green-400"
                    : pod.status === "Pending"
                    ? "bg-yellow-500/20 text-yellow-400"
                    : "bg-red-500/20 text-red-400"
                }`}
              >
                {pod.status}
              </span>

            </div>

            <div>

              <p className="text-slate-400">
                Node
              </p>

              <p className="text-white font-medium">
                {pod.node}
              </p>

            </div>

          </div>

        </div>

        {/* Runtime Information */}

        <div className="bg-slate-900 rounded-xl border border-slate-700 p-6">

          <h2 className="text-xl font-semibold mb-4">
            Runtime Information
          </h2>

          <div className="grid grid-cols-2 xl:grid-cols-4 gap-6">

            <div>

              <p className="text-slate-400">
                Pod IP
              </p>

              <p className="text-white font-medium">
                {pod.pod_ip}
              </p>

            </div>

            <div>

              <p className="text-slate-400">
                Host IP
              </p>

              <p className="text-white font-medium">
                {pod.host_ip}
              </p>

            </div>

            <div>

              <p className="text-slate-400">
                QoS Class
              </p>

              <p className="text-white font-medium">
                {pod.qos_class}
              </p>

            </div>

            <div>

              <p className="text-slate-400">
                Restart Count
              </p>

              <p
                className={`text-2xl font-bold ${
                  pod.restart_count > 0
                    ? "text-yellow-400"
                    : "text-green-400"
                }`}
              
>
                {pod.restart_count}
              </p>

            </div>

          </div>

        </div>
        
        {/* Health Status */}

        <div className="bg-slate-900 rounded-xl border border-slate-700 p-6">

          <h2 className="text-xl font-semibold mb-6">
            Health Status
          </h2>

          <div className="grid grid-cols-2 gap-6">

            <div>

              <p className="text-slate-400 mb-2">
                Ready
              </p>

              <p className={pod.health.ready ? "text-green-400 font-semibold" : "text-red-400 font-semibold"}>
                {pod.health.ready ? "Healthy" : "Not Ready"}
              </p>

            </div>

            <div>

              <p className="text-slate-400 mb-2">
                Containers Ready
              </p>

              <p className={pod.health.containers_ready ? "text-green-400 font-semibold" : "text-red-400 font-semibold"}>
                {pod.health.containers_ready ? "Healthy" : "Not Ready"}
              </p>

            </div>

            <div>

              <p className="text-slate-400 mb-2">
                Initialized
              </p>

              <p className={pod.health.initialized ? "text-green-400 font-semibold" : "text-red-400 font-semibold"}>
                {pod.health.initialized ? "Yes" : "No"}
              </p>

            </div>

            <div>

              <p className="text-slate-400 mb-2">
                Pod Scheduled
              </p>

              <p className={pod.health.pod_scheduled ? "text-green-400 font-semibold" : "text-red-400 font-semibold"}>
                {pod.health.pod_scheduled ? "Yes" : "No"}
              </p>

            </div>

          </div>

        </div>
               {/* Probe Status */}

        <div className="bg-slate-900 rounded-xl border border-slate-700 p-6">

          <h2 className="text-xl font-semibold mb-6">
            Probe Status
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Liveness */}

            <div className="border border-slate-700 rounded-lg p-5">

              <p className="text-slate-400 mb-3">
                Liveness Probe
              </p>

              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  pod.health.liveness_probe === "Not Configured"
                    ? "bg-slate-700 text-slate-300"
                    : "bg-green-500/20 text-green-400"
                }`}
              >
                {pod.health.liveness_probe}
              </span>

            </div>

            {/* Readiness */}

            <div className="border border-slate-700 rounded-lg p-5">

              <p className="text-slate-400 mb-3">
                Readiness Probe
              </p>

              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  pod.health.readiness_probe === "Not Configured"
                    ? "bg-slate-700 text-slate-300"
                    : "bg-green-500/20 text-green-400"
                }`}
              >
                {pod.health.readiness_probe}
              </span>

            </div>

            {/* Startup */}

            <div className="border border-slate-700 rounded-lg p-5">

              <p className="text-slate-400 mb-3">
                Startup Probe
              </p>

              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  pod.health.startup_probe === "Not Configured"
                    ? "bg-slate-700 text-slate-300"
                    : "bg-green-500/20 text-green-400"
                }`}
              >
                {pod.health.startup_probe}
              </span>

            </div>

          </div>

        </div>
        {/* Pod Events */}

        <div className="bg-slate-900 rounded-xl border border-slate-700 p-6">

            <div className="flex justify-between items-center mb-6">

  <div>

    <h2 className="text-xl font-semibold">
      Pod Events
    </h2>

    <p className="text-slate-400 text-sm mt-1">
      Kubernetes Events Timeline
    </p>

  </div>

  <button
    onClick={() => {
      if (namespace && name) {
        loadEvents(namespace, name);
      }
    }}
    className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition"
  >
    Refresh
  </button>

</div>
          {events.length === 0 ? (

            <p className="text-slate-400">
              No events found.
            </p>

          ) : (

	<div className="overflow-x-auto max-h-[350px] overflow-y-auto rounded-lg">
              <table className="w-full">

                <thead className="sticky top-0 bg-slate-900 z-10">

                  <tr className="border-b border-slate-700">

                    <th className="text-left py-3 px-2">
                      Type
                    </th>

                    <th className="text-left py-3 px-2">
                      Reason
                    </th>

                    <th className="text-left py-3 px-2">
                      Message
                    </th>

                    <th className="text-left py-3 px-2">
                      Count
                    </th>

                    <th className="text-left py-3 px-2">
                      Last Seen
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {events.map((event, index) => (

                    <tr
                      key={index}
                      className="border-b border-slate-800 hover:bg-slate-800"
                    >

                      <td className="py-3 px-2">
			<span
  className={`px-3 py-1 rounded-full text-xs font-semibold ${
    event.type === "Normal"
      ? "bg-green-500/20 text-green-400"
      : event.type === "Warning"
      ? "bg-yellow-500/20 text-yellow-400"
      : "bg-red-500/20 text-red-400"
  }`}
>
  {event.type}
</span>
                      </td>

                      <td className="py-3 px-2 font-medium">
                        {event.reason}
                      </td>

                      <td className="py-3 px-2 text-slate-300">

                        {event.message}

                      </td>

                      <td className="py-3 px-2">

                        {event.count}

                      </td>

                      <td className="py-3 px-2 text-slate-400">

		{event.last_timestamp
  			? new Date(
      			event.last_timestamp
    				).toLocaleString()
  			: "N/A"}
                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </div>

{/* Containers */}

        <div className="bg-slate-900 rounded-xl border border-slate-700 p-6">

          <h2 className="text-xl font-semibold mb-6">
            Containers
          </h2>

          <div className="space-y-5">

            {pod.containers.map((container) => (

              <div
                key={container.name}
                className="border border-slate-700 rounded-lg p-5 hover:border-blue-500 transition"
              >

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

                  <div>

                    <p className="text-slate-400 mb-1">
                      Container Name
                    </p>

                    <p className="text-white font-semibold">
                      {container.name}
                    </p>

                  </div>

                  <div>

                    <p className="text-slate-400 mb-1">
                      Image
                    </p>

                    <p className="text-blue-400 break-all">
                      {container.image}
                    </p>

                  </div>

                  <div>

                    <p className="text-slate-400 mb-1">
                      Ports
                    </p>

                    <p className="text-white">

                      {container.ports.length > 0
                        ? container.ports.join(", ")
                        : "No Ports"}

                    </p>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* Conditions */}

        <div className="bg-slate-900 rounded-xl border border-slate-700 p-6">

          <h2 className="text-xl font-semibold mb-6">
            Conditions
          </h2>

          <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">

            {pod.conditions.map((condition) => (

              <div
                key={condition.type}
                className="border border-slate-700 rounded-lg p-4 text-center"
              >

                <p className="text-slate-400 mb-3">
                  {condition.type}
                </p>

                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    condition.status === "True"
                      ? "bg-green-500/20 text-green-400"
                      : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {condition.status}
                </span>

              </div>

            ))}

          </div>

        </div>
        {/* Pod Actions */}

        <div className="bg-slate-900 rounded-xl border border-slate-700 p-6">

          <h2 className="text-2xl font-bold mb-6">
            Pod Actions
          </h2>

          <div className="flex gap-4">

            <button
              onClick={handleDeletePod}
              className="bg-red-600 hover:bg-red-700 transition px-6 py-3 rounded-lg text-white font-semibold"
            >
              Delete Pod
            </button>

          </div>

        </div>

        {/* Live Pod Logs */}

        <div className="bg-slate-900 rounded-xl border border-slate-700 p-6">

          <div className="flex justify-between items-center mb-6">

            <div>

              <h2 className="text-2xl font-bold">
                Live Pod Logs
              </h2>

              <p className="text-slate-400 mt-1">
                Streaming logs from Kubernetes
              </p>

            </div>

            <div className="flex items-center gap-2">

              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>

              <span className="text-green-400 font-semibold">
                LIVE
              </span>

            </div>

          </div>

          <div className="bg-black border border-slate-700 rounded-lg">

            <div className="border-b border-slate-700 bg-slate-950 px-4 py-2">

              <span className="text-green-400 font-semibold">
                Terminal
              </span>

            </div>

            <pre
              ref={logsRef}
              className="bg-black rounded-b-lg p-4 text-green-400 font-mono text-sm overflow-auto whitespace-pre-wrap h-[500px]"
            >
              {logs || "Waiting for logs..."}
            </pre>

          </div>

        </div>

      </div>

    </main>

  );

}
