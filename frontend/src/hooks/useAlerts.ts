import { useEffect, useState } from "react";
import { getAlerts } from "../services/alertService";
import type { Alert } from "../types/alerts";

export function useAlerts() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    try {
      setLoading(true);
      const data = await getAlerts();
      setAlerts(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  return {
    alerts,
    loading,
    refresh,
  };
}
