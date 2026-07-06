import { useEffect, useState } from "react";
import { getNamespaces } from "../services/namespaceService";
import type { Namespace } from "../types/namespace";

export function useNamespaces() {
  const [namespaces, setNamespaces] = useState<Namespace[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadNamespaces() {
    try {
      const data = await getNamespaces();
      setNamespaces(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadNamespaces();
  }, []);

  return {
    namespaces,
    loading,
    refresh: loadNamespaces,
  };
}
