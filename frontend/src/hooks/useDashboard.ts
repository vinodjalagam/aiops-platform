import { useEffect, useState } from "react";
import { getDashboard } from "../services/dashboardService";
import type { DashboardResponse } from "../types/dashboard";

export function useDashboard() {
  const [dashboard, setDashboard] =
    useState<DashboardResponse | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboard() {
      const data = await getDashboard();
      setDashboard(data);
      setLoading(false);
    }

    fetchDashboard();
  }, []);

  return {
    dashboard,
    loading,
  };
}