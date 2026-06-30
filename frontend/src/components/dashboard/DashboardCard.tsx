import { ReactNode } from "react";

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  color: string;
}

export default function DashboardCard({
  title,
  value,
  icon,
  color,
}: DashboardCardProps) {
  return (
    <div className="bg-slate-900 rounded-xl shadow-lg border border-slate-800 p-6 hover:border-blue-500 transition-all duration-300">
      <div className="flex justify-between items-center">

        <div>
          <p className="text-slate-400 text-sm">
            {title}
          </p>

          <h2 className="text-3xl font-bold text-white mt-2">
            {value}
          </h2>
        </div>

        <div className={`p-4 rounded-xl ${color}`}>
          {icon}
        </div>

      </div>
    </div>
  );
}
