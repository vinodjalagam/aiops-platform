import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const askAssistant = async (
  question: string
) => {

  const response = await axios.post(
    `${API}/assistant`,
    {
      question,
    }
  );

  return response.data;
};
