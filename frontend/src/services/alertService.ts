import axios from "axios";
import type { Alert } from "../types/alerts";

const API = import.meta.env.VITE_API_URL;

export const getAlerts = async (): Promise<Alert[]> => {
  const response = await axios.get<Alert[]>(
    `${API}/alerts`
  );

  return response.data;
};
