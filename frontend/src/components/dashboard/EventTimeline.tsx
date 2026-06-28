import { Clock3 } from "lucide-react";

const events = [
  {
    time: "09:42",
    event: "worker-01 became NotReady",
    color: "bg-red-500",
  },
  {
    time: "09:47",
    event: "Kubelet restarted",
    color: "bg-yellow-500",
  },
  {
    time: "09:49",
    event: "Node Ready",
    color: "bg-green-500",
  },
  {
    time: "09:55",
    event: "Deployment scaled to 5 replicas",
    color: "bg-blue-500",
  },
];

export default function EventTimeline() {
  return (
    <div className="bg-slate-900 rounded-xl border border-slate-800 p-5">
      <div className="flex items-center gap-2 mb-5">
        <Clock3 className="text-cyan-400" />
        <h2 className="text-xl font-semibold">
          Kubernetes Events Timeline
        </h2>
      </div>

      <div className="space-y-4">
        {events.map((event, index) => (
          <div key={index} className="flex items-center gap-4">
            <div className={`w-3 h-3 rounded-full ${event.color}`} />

            <span className="text-slate-400 w-16">
              {event.time}
            </span>

            <span className="text-white">
              {event.event}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}