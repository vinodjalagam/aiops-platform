import axios from "axios";
import type { MetricsResponse } from "../types/metrics";

const API = import.meta.env.VITE_API_URL;

export const getMetrics = async (): Promise<MetricsResponse> => {
  const response = await axios.get<MetricsResponse>(
    `${API}/metrics`
  );

  return response.data;
};
