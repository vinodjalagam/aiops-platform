export interface LogsResponse {
  pod: string;
  namespace: string;
  tail_lines: number;
  logs: string;
}
