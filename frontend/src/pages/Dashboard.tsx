import KpiCard from "../components/dashboard/KpiCard";
import IncidentChart from "../components/dashboard/IncidentChart";
import RecentIncidents from "../components/dashboard/RecentIncidents";
import AIInsights from "../components/dashboard/AIInsights";
import ClusterHealth from "../components/dashboard/ClusterHealth";
import EventTimeline from "../components/dashboard/EventTimeline";
import { useDashboard } from "../hooks/useDashboard";
import { useNavigate } from "react-router-dom";

import {
  Server,
  Box,
  Bell,
  Cpu,
  MemoryStick,
  HeartPulse,
} from "lucide-react";

export default function Dashboard() {
  const { dashboard, loading } = useDashboard();
  const navigate = useNavigate();

  if (loading) {
    return (
      <main className="flex-1 bg-slate-950 flex items-center justify-center">
        <h1 className="text-white text-2xl">Loading Dashboard...</h1>
      </main>
    );
  }

  return (
    <main className="flex-1 bg-slate-950 p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-white">Dashboard</h1>

          <p className="text-slate-400 mt-1">
            Overview of your Kubernetes infrastructure
          </p>
        </div>

        <div className="text-right">
          <div className="flex items-center justify-end gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>

            <span className="text-green-400 font-medium">
              Connected
            </span>
          </div>

          <p className="text-slate-400 text-sm mt-2">
            Last Updated: Just now
          </p>

          <button className="mt-3 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition">
            Refresh
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">

        <KpiCard
          title="Nodes"
          value={dashboard?.nodes.toString() || "0"}
          color="text-green-400"
          trend="Live from Kubernetes"
          icon={<Server className="text-green-400" />}
          onClick={() => navigate("/nodes")}
        />

        <KpiCard
          title="Pods"
          value={dashboard?.pods.toString() || "0"}
          color="text-blue-400"
          trend="Live from Kubernetes"
          icon={<Box className="text-blue-400" />}
          onClick={() => navigate("/pods")}
        />

        <KpiCard
          title="Alerts"
          value={dashboard?.alerts.toString() || "0"}
          color="text-red-400"
          trend="Cluster Alerts"
          icon={<Bell className="text-red-400" />}
        />

        <KpiCard
          title="CPU Usage"
          value={`${dashboard?.cpu || 0}%`}
          color="text-yellow-400"
          trend="Metrics Server (Coming Soon)"
          icon={<Cpu className="text-yellow-400" />}
        />

        <KpiCard
          title="Memory"
          value={`${dashboard?.memory || 0}%`}
          color="text-purple-400"
          trend="Metrics Server (Coming Soon)"
          icon={<MemoryStick className="text-purple-400" />}
        />

        <KpiCard
          title="Cluster Health"
          value={`${dashboard?.cluster_health || 0}%`}
          color="text-green-500"
          trend="Live Cluster Status"
          icon={<HeartPulse className="text-green-400" />}
        />

      </div>

      <div className="grid grid-cols-2 gap-6 mt-8">
        <IncidentChart />
        <RecentIncidents />
      </div>

      <div className="grid grid-cols-2 gap-6 mt-6">
        <AIInsights />
        <ClusterHealth />
      </div>

      <div className="mt-6">
        <EventTimeline />
      </div>
    </main>
  );
}
