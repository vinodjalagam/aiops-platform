import { useEffect, useState } from "react";
import { getServices } from "../services/serviceService";

export function useServices() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadServices();
  }, []);

  async function loadServices() {
    try {
      const data = await getServices();
      setServices(data);
    } finally {
      setLoading(false);
    }
  }

  return {
    services,
    loading,
    refresh: loadServices,
  };
}
