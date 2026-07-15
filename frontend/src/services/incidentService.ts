import axios from "axios";
import type { Incident } from "../types/incidents";

const API = import.meta.env.VITE_API_URL;

export const getIncidents = async (): Promise<Incident[]> => {
  const response = await axios.get(`${API}/incidents`);

  return response.data.incidents;
};
