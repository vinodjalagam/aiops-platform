import axios from "axios";
import type { DashboardResponse } from "../types/dashboard";

const API = import.meta.env.VITE_API_URL;

export const getDashboard = async (): Promise<DashboardResponse> => {
  const response = await axios.get<DashboardResponse>(
    `${API}/dashboard`
  );

  return response.data;
};