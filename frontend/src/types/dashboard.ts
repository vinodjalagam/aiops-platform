export interface DashboardResponse {
  nodes: number;
  pods: number;
  cpu: number;
  memory: number;
  alerts: number;
  cluster_health: number;
}