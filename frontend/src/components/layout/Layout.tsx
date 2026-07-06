import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="flex h-screen bg-slate-950">
      <Sidebar />

      <div className="flex flex-col flex-1">
        <Header />
        <Outlet />
      </div>
    </div>
  );
}
