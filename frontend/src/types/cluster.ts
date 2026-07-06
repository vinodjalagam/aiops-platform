export interface ClusterResponse {
  cluster_name: string;
  kubernetes_version: string;
  health: string;

  healthy_components: number;
  total_components: number;

  nodes: {
    total: number;
    ready: number;
    not_ready: number;
  };

  resources: {
    pods: number;
    deployments: number;
    services: number;
    namespaces: number;
  };

 node_summary: {
  name: string;
  role: string;
  status: string;
  version: string;
}[];
 components: {
    name: string;
    status: string;
  }[];
}
