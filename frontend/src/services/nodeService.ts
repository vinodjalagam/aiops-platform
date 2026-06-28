import axios from "axios";
import type { Node } from "../types/node";

const API = import.meta.env.VITE_API_URL;

export const getNodes = async (): Promise<Node[]> => {
  const response = await axios.get<Node[]>(`${API}/nodes`);
  return response.data;
};
