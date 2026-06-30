import KpiCard from "../components/dashboard/KpiCard";
import IncidentChart from "../components/dashboard/IncidentChart";
import RecentIncidents from "../components/dashboard/RecentIncidents";
import AIInsights from "../components/dashboard/AIInsights";
import ClusterHealth from "../components/dashboard/ClusterHealth";
import EventTimeline from "../components/dashboard/EventTimeline";
import LastUpdated from "../components/dashboard/LastUpdated";

import { useDashboard } from "../hooks/useDashboard";
import { useNavigate } from "react-router-dom";

import {
  Server,
  Box,
  Layers,
  Network,
  Bell,
  Cpu,
  MemoryStick,
  HeartPulse,
  RefreshCw,
} from "lucide-react";

export default function Dashboard() {
  const {
    dashboard,
    loading,
    refresh,
  } = useDashboard();

  const navigate = useNavigate();

  if (loading) {
    return (
      <main className="flex-1 bg-slate-950 flex items-center justify-center">
        <h1 className="text-white text-2xl">
          Loading Dashboard...
        </h1>
      </main>
    );
  }

  return (
    <main className="flex-1 bg-slate-950 p-8">

      {/* Header */}

      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-8">

        <div>
          <h1 className="text-4xl font-bold text-white">
            Kubernetes Dashboard
          </h1>

          <p className="text-slate-400 mt-2">
            Monitor your Kubernetes infrastructure in real time.
          </p>
        </div>

        <div className="mt-6 lg:mt-0 flex flex-col items-end gap-4">

          <div className="flex items-center gap-2">

            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>

            <span className="text-green-400 font-semibold">
              Cluster Connected
            </span>

          </div>

          <LastUpdated />

          <button
            onClick={refresh}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg text-white transition-all duration-300"
          >
            <RefreshCw size={18} />
            Refresh
          </button>

        </div>

      </div>

      {/* KPI Cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

<KpiCard
  title="Nodes"
  value={
    dashboard
      ? `${dashboard.nodes.ready}/${dashboard.nodes.total}`
      : "0/0"
  }
  color="text-green-400"
  trend="Ready Nodes"
  icon={<Server className="text-green-400" />}
  onClick={() => navigate("/nodes")}
/>
<KpiCard
  title="Pods"
  value={
    dashboard
      ? `${dashboard.pods.running}/${dashboard.pods.total}`
      : "0/0"
  }
  color="text-blue-400"
  trend="Running Pods"
  icon={<Box className="text-blue-400" />}
  onClick={() => navigate("/pods")}
/>
<KpiCard
  title="Deployments"
  value={
    dashboard
      ? `${dashboard.deployments.available}/${dashboard.deployments.total}`
      : "0/0"
  }
  color="text-indigo-400"
  trend="Available"
  icon={<Layers className="text-indigo-400" />}
  onClick={() => navigate("/deployments")}
/>
<KpiCard
  title="Services"
  value={
    dashboard
      ? dashboard.services.total.toString()
      : "0"
  }
  color="text-orange-400"
  trend="Cluster Services"
  icon={<Network className="text-orange-400" />}
  onClick={() => navigate("/services")}
/>
<KpiCard
  title="Namespaces"
  value={
    dashboard
      ? dashboard.namespaces.total.toString()
      : "0"
  }
  color="text-cyan-400"
  trend="Cluster Namespaces"
  icon={<Layers className="text-cyan-400" />}
/>

<KpiCard
  title="Warnings"
  value={
    dashboard
      ? dashboard.events.warning.toString()
      : "0"
  }
  color="text-yellow-400"
  trend="Kubernetes Events"
  icon={<Bell className="text-yellow-400" />}
/>

<KpiCard
  title="Critical Events"
  value={
    dashboard
      ? dashboard.events.critical.toString()
      : "0"
  }
  color={
    dashboard?.events.critical
      ? "text-red-400"
      : "text-green-400"
  }
  trend="Cluster Critical Events"
  icon={<Bell className="text-red-400" />}
/>
        <KpiCard
          title="CPU Usage"
          value={`${dashboard?.cpu || 0}%`}
          color="text-yellow-400"
          trend="Live Metrics"
          icon={<Cpu className="text-yellow-400" />}
        />

        <KpiCard
          title="Memory Usage"
          value={`${dashboard?.memory || 0}%`}
          color="text-purple-400"
          trend="Live Metrics"
          icon={<MemoryStick className="text-purple-400" />}
        />

<KpiCard
  title="Restarting Pods"
  value={
    dashboard
      ? dashboard.pods.restarting.toString()
      : "0"
  }
  color={
    dashboard?.pods.restarting
      ? "text-yellow-400"
      : "text-green-400"
  }
  trend="Container Restarts"
  icon={<RefreshCw className="text-yellow-400" />}
/>


<KpiCard
  title="Cluster Health"
  value={
    dashboard
      ? dashboard.cluster_health.status
      : "Healthy"
  }
  color={
    dashboard?.cluster_health.status === "Critical"
      ? "text-red-400"
      : dashboard?.cluster_health.status === "Warning"
      ? "text-yellow-400"
      : "text-green-400"
  }
  trend={
    dashboard
      ? `${dashboard.cluster_health.score}% Healthy`
      : "Cluster Status"
  }
icon={
  <HeartPulse
    className={
      dashboard?.cluster_health.status === "Critical"
        ? "text-red-400"
        : dashboard?.cluster_health.status === "Warning"
        ? "text-yellow-400"
        : "text-green-400"
    }
  />
}
/>
      </div>

      {/* Charts */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-8">

        <IncidentChart />

        <RecentIncidents />

      </div>

      {/* AI + Cluster Health */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-8">

        <AIInsights />

        <ClusterHealth />

      </div>

      {/* Events */}

      <div className="mt-8">

        <EventTimeline />

      </div>

    </main>
  );
}
