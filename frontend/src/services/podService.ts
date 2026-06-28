import axios from "axios";
import type { Pod } from "../types/pod";

const API = import.meta.env.VITE_API_URL;

export const getPods = async (): Promise<Pod[]> => {
  const response = await axios.get<Pod[]>(`${API}/pods`);
  return response.data;
};
