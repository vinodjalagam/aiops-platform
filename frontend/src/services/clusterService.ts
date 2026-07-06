import axios from "axios";
import type { ClusterResponse } from "../types/cluster";

const API = import.meta.env.VITE_API_URL;

export const getCluster = async (): Promise<ClusterResponse> => {
  const response = await axios.get<ClusterResponse>(
    `${API}/cluster`
  );

  return response.data;
};
