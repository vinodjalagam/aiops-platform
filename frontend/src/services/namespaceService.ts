import axios from "axios";
import type { Namespace } from "../types/namespace";

const API_URL = import.meta.env.VITE_API_URL;

export const getNamespaces = async (): Promise<Namespace[]> => {
  const response = await axios.get(`${API_URL}/namespaces`);
  return response.data;
};

export const getNamespace = async (name: string) => {
  const response = await axios.get(
    `${API_URL}/namespaces/${name}`
  );

  return response.data;
};
