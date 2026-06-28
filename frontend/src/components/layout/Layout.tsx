import Sidebar from "./Sidebar";
import Header from "./Header";
import Dashboard from "../../pages/Dashboard";

export default function Layout() {
  return (
    <div className="flex h-screen bg-slate-950">
      <Sidebar />

      <div className="flex flex-col flex-1">
        <Header />
        <Dashboard />
      </div>
    </div>
  );
}
