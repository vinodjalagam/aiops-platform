import { useEffect, useState } from "react";
import { getIncidents } from "../services/incidentService";
import type { Incident } from "../types/incidents";

export function useIncidents() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    try {
      setLoading(true);
      const data = await getIncidents();
      setIncidents(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  return {
    incidents,
    loading,
    refresh,
  };
}
