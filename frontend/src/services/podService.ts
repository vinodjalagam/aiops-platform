import axios from "axios";
import type { Pod } from "../types/pod";

const API = import.meta.env.VITE_API_URL;

export const getPods = async (): Promise<Pod[]> => {
  const response = await axios.get<Pod[]>(`${API}/pods`);
  return response.data;
};

export const getPod = async (
  namespace: string,
  name: string,
) => {
  const response = await axios.get(
    `${API}/pods/${namespace}/${name}`
  );

  return response.data;
};
export const getPodLogs = async (
  namespace: string,
  name: string,
  tailLines: number = 100,
) => {

  const response = await axios.get(
    `${API}/pods/${namespace}/${name}/logs?tail_lines=${tailLines}`
  );

  return response.data;
};
export const deletePod = async (
  namespace: string,
  name: string,
) => {

  const response = await axios.delete(
    `${API}/pods/${namespace}/${name}`
  );

  return response.data;

};
