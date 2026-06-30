import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getDeployments = async () => {
  const response = await axios.get(
    `${API_URL}/deployments`
  );

  return response.data;
};

export const getDeployment = async (
  namespace: string,
  name: string,
) => {
  const response = await axios.get(
    `${API_URL}/deployments/${namespace}/${name}`
  );

  return response.data;
};

export const updateDeploymentImage = async (
  namespace: string,
  name: string,
  image: string,
) => {

  const response = await axios.patch(
    `${API_URL}/deployments/${namespace}/${name}/image`,
    {
      image,
    }
  );

  return response.data;
};
export const scaleDeployment = async (
  namespace: string,
  name: string,
  replicas: number,
) => {

  const response = await axios.patch(
    `${API_URL}/deployments/${namespace}/${name}/scale`,
    {
      replicas,
    }
  );

  return response.data;
};
export const deleteDeployment = async (
  namespace: string,
  name: string,
) => {

  const response = await axios.delete(
    `${API_URL}/deployments/${namespace}/${name}`
  );

  return response.data;
};
