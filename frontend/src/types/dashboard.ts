export interface DashboardResponse {
  nodes: number;
  pods: number;
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
  alerts: number;
  cluster_health: number;
}
