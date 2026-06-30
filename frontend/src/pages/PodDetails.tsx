import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  getPod,
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
}

export default function PodDetails() {

  const navigate = useNavigate();

  const { namespace, name } = useParams();

  const [pod, setPod] =
    useState<Pod | null>(null);

  const [logs, setLogs] =
    useState("");

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

  useEffect(() => {

    if (!namespace || !name) return;

    loadPod(namespace, name);

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
