import { useEffect, useState } from "react";
import { getCluster } from "../services/clusterService";
import type { ClusterResponse } from "../types/cluster";

export function useCluster() {
  const [cluster, setCluster] =
    useState<ClusterResponse | null>(null);

  const [loading, setLoading] = useState(true);

  const loadCluster = async () => {
    try {
      setCluster(await getCluster());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCluster();
  }, []);

  return {
    cluster,
    loading,
    refresh: loadCluster,
  };
}
