import { useEffect, useState } from "react";
import { getNodes } from "../services/nodeService";
import type { Node } from "../types/node";

export function useNodes() {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadNodes() {
      try {
        const data = await getNodes();
        setNodes(data);
      } finally {
        setLoading(false);
      }
    }

    loadNodes();
  }, []);

  return { nodes, loading };
}
