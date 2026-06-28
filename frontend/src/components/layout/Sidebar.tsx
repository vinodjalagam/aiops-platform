import { NavLink } from "react-router-dom";
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
  { name: "Dashboard", path: "/", icon: LayoutDashboard },
  { name: "Cluster", path: "/cluster", icon: Server },
  { name: "Nodes", path: "/nodes", icon: Boxes },
  { name: "Pods", path: "/pods", icon: Box },
  { name: "Metrics", path: "/metrics", icon: Activity },
  { name: "Logs", path: "/logs", icon: FileText },
  { name: "Incidents", path: "/incidents", icon: AlertTriangle },
  { name: "Alerts", path: "/alerts", icon: Bell },
  { name: "AI Assistant", path: "/assistant", icon: Bot },
  { name: "Settings", path: "/settings", icon: Settings },
];

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-slate-900 text-white border-r border-slate-800">
      <div className="flex items-center gap-3 p-6">
        <div className="bg-blue-600 rounded-xl p-3">🤖</div>

        <div>
          <h1 className="text-2xl font-bold">AIOps</h1>

          <p className="text-slate-400 text-sm">
            Kubernetes Intelligence
          </p>
        </div>
      </div>

      <nav className="px-3 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `flex items-center gap-3 w-full px-4 py-3 rounded-lg transition ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "hover:bg-slate-800 text-slate-300"
                }`
              }
            >
              <Icon size={20} />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
