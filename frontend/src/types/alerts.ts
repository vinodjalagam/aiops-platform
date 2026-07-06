export interface Alert {
  namespace: string;
  pod: string;
  severity: string;
  reason: string;
  message: string;
}
