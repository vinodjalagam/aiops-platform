export interface MetricsResponse {
  cpu: {
    percentage: number;
    used: number;
    total: number;
  };

  memory: {
    percentage: number;
    used: number;
    total: number;
  };

  nodes: {
    name: string;
    cpu_m: number;
    memory_mi: number;
  }[];
}
