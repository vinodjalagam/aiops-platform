interface UsageBarProps {
  title: string;
  value: number;
  color: string;
}

export default function UsageBar({
  title,
  value,
  color,
}: UsageBarProps) {
  return (
    <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">

      <div className="flex justify-between mb-3">
        <span className="text-slate-300 font-medium">
          {title}
        </span>

        <span className="text-white font-semibold">
          {value}%
        </span>
      </div>

      <div className="w-full bg-slate-700 rounded-full h-3">

        <div
          className={`${color} h-3 rounded-full transition-all duration-700`}
          style={{ width: `${Math.min(value, 100)}%` }}
        />

      </div>

    </div>
  );
}
