import { Bell, Search, UserCircle } from "lucide-react";

export default function Header() {
  return (
    <header className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6">
      {/* Search Bar */}
        <div className="flex items-center bg-slate-800 rounded-xl px-4 py-2 w-[420px] border border-slate-700">
    <Search size={18} className="text-slate-400" />

    <input
        type="text"
        placeholder="Search incidents, nodes, pods..."
        className="bg-transparent outline-none text-white ml-3 flex-1"
    />

    <kbd className="bg-slate-700 text-slate-300 text-xs px-2 py-1 rounded">
        Ctrl + K
    </kbd>
    </div>

      {/* Right Side */}
      <div className="flex items-center gap-6">
        <Bell className="cursor-pointer hover:text-blue-400" />

        <div className="flex items-center gap-2">
          <UserCircle size={34} />
          <div>
            <p className="text-sm font-semibold">Vinod</p>
            <p className="text-xs text-slate-400">DevOps Engineer</p>
          </div>
        </div>
      </div>
    </header>
  );
}