import { Clock } from "lucide-react";
import { useEffect, useState } from "react";

export default function LastUpdated() {
  const [time, setTime] = useState(
    new Date().toLocaleTimeString()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-slate-900 rounded-xl border border-slate-800 shadow-lg p-6">

      <div className="flex items-center gap-3 mb-4">

        <Clock className="text-blue-400" size={24} />

        <h2 className="text-xl font-semibold text-white">
          Last Updated
        </h2>

      </div>

      <p className="text-3xl font-bold text-white">
        {time}
      </p>

      <p className="text-slate-400 mt-2">
        Dashboard refreshes automatically.
      </p>

    </div>
  );
}
