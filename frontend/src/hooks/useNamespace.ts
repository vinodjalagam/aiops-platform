import { useEffect, useState } from "react";
import { getNamespace } from "../services/namespaceService";

export function useNamespace(name: string) {
  const [namespace, setNamespace] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  async function loadNamespace() {
    try {
      const data = await getNamespace(name);
      setNamespace(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (name) {
      loadNamespace();
    }
  }, [name]);

  return {
    namespace,
    loading,
    refresh: loadNamespace,
  };
}
