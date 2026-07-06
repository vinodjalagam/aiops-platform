export interface Incident {
  namespace: string;
  pod: string;
  severity: string;
  reason: string;
  message: string;
}
