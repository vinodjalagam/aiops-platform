import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getServices = async () => {
  const response = await axios.get(
    `${API_URL}/services`
  );

  return response.data;
};

export const getService = async (
  namespace: string,
  name: string
) => {
  const response = await axios.get(
    `${API_URL}/services/${namespace}/${name}`
  );

  return response.data;
};
