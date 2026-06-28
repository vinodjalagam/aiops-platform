import { useEffect, useState } from "react";
import { getPods } from "../services/podService";
import type { Pod } from "../types/pod";

export function usePods() {
  const [pods, setPods] = useState<Pod[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPods() {
      try {
        const data = await getPods();
        setPods(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadPods();
  }, []);

  return { pods, loading };
}
