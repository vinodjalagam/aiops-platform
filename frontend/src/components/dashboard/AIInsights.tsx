import { Bot, Sparkles, TriangleAlert } from "lucide-react";

export default function AIInsights() {
  return (
    <div className="bg-slate-900 rounded-xl border border-slate-800 p-6 h-72">

      <div className="flex items-center gap-3 mb-5">
        <Bot className="text-violet-400" size={28} />

        <div>
          <h2 className="text-xl font-bold text-white">
            AI Incident Summary
          </h2>

          <p className="text-slate-400 text-sm">
            Generated 10 seconds ago
          </p>
        </div>
      </div>

      <div className="space-y-4">

        <div className="flex gap-3">
          <Sparkles className="text-blue-400 mt-1" />

          <p className="text-slate-300">
            Cluster health is stable with
            <span className="text-green-400 font-semibold">
              {" "}98% availability.
            </span>
          </p>
        </div>

        <div className="flex gap-3">
          <TriangleAlert className="text-red-400 mt-1" />

          <p className="text-slate-300">
            Worker-01 CPU utilization has exceeded
            <span className="text-red-400 font-semibold">
              {" "}85%
            </span>
            {" "}for the last 15 minutes.
          </p>
        </div>

        <div className="bg-slate-800 rounded-lg p-4 mt-5">

          <h3 className="text-green-400 font-semibold">
            AI Recommendation
          </h3>

          <p className="text-slate-300 mt-2">
            Scale the frontend deployment to 5 replicas
            and rebalance workloads across worker nodes.
          </p>

        </div>

      </div>

    </div>
  );
}