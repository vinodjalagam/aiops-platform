import { ArrowUpRight } from "lucide-react";

interface KpiCardProps {
  title: string;
  value: string;
  color: string;
  icon: React.ReactNode;
  trend: string;
}

export default function KpiCard({
  title,
  value,
  color,
  icon,
  trend,
}: KpiCardProps) {
  return (
    <div className="bg-slate-900 rounded-xl border border-slate-800 p-5 shadow-md hover:border-blue-500 transition">

      <div className="flex justify-between items-center">
        <div>
          <p className="text-slate-400">{title}</p>

          <h2 className={`text-4xl font-bold mt-2 ${color}`}>
            {value}
          </h2>
        </div>

        <div className="bg-slate-800 p-3 rounded-xl">
          {icon}
        </div>
      </div>

      <div className="flex items-center mt-4 text-green-400 text-sm">
        <ArrowUpRight size={16} />
        <span>{trend}</span>
      </div>

      <div className="mt-4 bg-slate-800 h-2 rounded-full">
        <div className="bg-blue-500 h-2 rounded-full w-3/4"></div>
      </div>

    </div>
  );
}