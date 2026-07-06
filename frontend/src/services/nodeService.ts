import axios from "axios";
import type { Node } from "../types/node";

const API = import.meta.env.VITE_API_URL;

export const getNodes = async (): Promise<Node[]> => {
  const response = await axios.get<Node[]>(`${API}/nodes`);
  return response.data;
};
export interface NodeCondition {
  type: string;
  status: string;
}

export interface NodeLabel {
  key: string;
  value: string;
}

export interface NodeTaint {
  key: string;
  value: string | null;
  effect: string;
}

export interface RunningPod {
  name: string;
  namespace: string;
  status: string;
}

export interface NodeDetails {
  name: string;
  status: string;
  ready_reason: string;
  ready_message: string;
    diagnosis: {
    severity: string;
    title: string;
    explanation: string;
    recommended_actions: string[];
  };

  os_image: string;
  kernel_version: string;
  container_runtime: string;
  kubelet_version: string;

  capacity: {
    cpu: string;
    memory: string;
    pods: string;
  };

  allocatable: {
    cpu: string;
    memory: string;
    pods: string;
  };

  labels: NodeLabel[];

  taints: NodeTaint[];

  conditions: NodeCondition[];

  running_pods: RunningPod[];
}

export const getNode = async (
  name: string,
): Promise<NodeDetails> => {

  const response = await axios.get<NodeDetails>(
    `${API}/nodes/${name}`,
  );

  return response.data;

};
