import axios from "axios";
import type { LogsResponse } from "../types/logs";

const API = import.meta.env.VITE_API_URL;

export const getLogs = async (
  namespace: string,
  pod: string,
  tailLines: number = 100
): Promise<LogsResponse> => {
  const response = await axios.get<LogsResponse>(
    `${API}/pods/${namespace}/${pod}/logs`,
    {
      params: {
        tail_lines: tailLines,
      },
    }
  );

  return response.data;
};
