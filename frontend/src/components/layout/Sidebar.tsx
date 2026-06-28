import {
  LayoutDashboard,
  Server,
  Boxes,
  Box,
  Activity,
  FileText,
  AlertTriangle,
  Bell,
  Bot,
  Settings,
} from "lucide-react";

const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard },
  { name: "Cluster", icon: Server },
  { name: "Nodes", icon: Boxes },
  { name: "Pods", icon: Box },
  { name: "Metrics", icon: Activity },
  { name: "Logs", icon: FileText },
  { name: "Incidents", icon: AlertTriangle },
  { name: "Alerts", icon: Bell },
  { name: "AI Assistant", icon: Bot },
  { name: "Settings", icon: Settings },
];

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-slate-900 text-white border-r border-slate-800">
      <div className="flex items-center gap-3">
    <div className="bg-blue-600 rounded-xl p-3">
        🤖
    </div>

    <div>
        <h1 className="text-2xl font-bold">
            AIOps
        </h1>

        <p className="text-slate-400 text-sm">
            Kubernetes Intelligence
        </p>
    </div>
</div>

      <nav className="px-3">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.name}
                className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg transition
                ${
                item.name === "Dashboard"
                    ? "bg-blue-600 text-white"
                    : "hover:bg-slate-800 text-slate-300"
                }`}            >
              <Icon size={20} />
              <span>{item.name}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}