import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const data = [
  { day: "Mon", incidents: 2 },
  { day: "Tue", incidents: 5 },
  { day: "Wed", incidents: 3 },
  { day: "Thu", incidents: 8 },
  { day: "Fri", incidents: 4 },
  { day: "Sat", incidents: 6 },
  { day: "Sun", incidents: 2 },
];

export default function IncidentChart() {
  return (
    <div className="bg-slate-900 rounded-xl p-5 border border-slate-800 h-80">
      <h2 className="text-xl font-semibold text-white mb-4">
        Incident Trend
      </h2>

      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={data}>
          <CartesianGrid stroke="#334155" strokeDasharray="3 3" />

          <XAxis dataKey="day" stroke="#94A3B8" />

          <YAxis stroke="#94A3B8" />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="incidents"
            stroke="#3B82F6"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}