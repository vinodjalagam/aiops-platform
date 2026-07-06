import { useEffect, useState } from "react";
import { getLogs } from "../services/logsService";
import type { LogsResponse } from "../types/logs";

export function useLogs(
  namespace: string,
  pod: string,
  tailLines: number
) {
  const [logs, setLogs] = useState<LogsResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const loadLogs = async () => {
    try {
      setLoading(true);
      const data = await getLogs(namespace, pod, tailLines);
      setLogs(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (namespace && pod) {
      loadLogs();
    }
  }, [namespace, pod, tailLines]);

  return {
    logs,
    loading,
    refresh: loadLogs,
  };
}
