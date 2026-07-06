import { useEffect, useState } from "react";
import { getMetrics } from "../services/metricsService";
import type { MetricsResponse } from "../types/metrics";

export function useMetrics() {

  const [metrics, setMetrics] =
    useState<MetricsResponse | null>(null);

  const [loading, setLoading] = useState(true);

  const loadMetrics = async () => {

    try {

      setMetrics(await getMetrics());

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    loadMetrics();

  }, []);

  return {
    metrics,
    loading,
    refresh: loadMetrics,
  };

}
