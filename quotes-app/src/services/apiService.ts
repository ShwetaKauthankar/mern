import axios from "axios";

const API_BASE_URL = "https://assignment.stage.crafto.app";

export const login = async (username: string, otp: string) => {
  const response = await axios.post(`${API_BASE_URL}/login`, {
    username,
    otp,
  });
  return response.data;
};

export const uploadMedia = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  const response = await axios.post(
    "https://crafto.app/crafto/v1.0/media/assignment/upload",
    formData,
    { headers: { "Content-Type": "multipart/form-data" } }
  );
  return response.data;
};

export const createQuote = async (
  token: string,
  text: string,
  mediaUrl: string
) => {
  const response = await axios.post(
    `${API_BASE_URL}/postQuote`,
    { text, mediaUrl },
    { headers: { Authorization: token } }
  );
  return response.data;
};

export const getQuotes = async (token: string, limit: number, offset: number) => {
  const response = await axios.get(
    `${API_BASE_URL}/getQuotes?limit=${limit}&offset=${offset}`,
    { headers: { Authorization: token } }
  );
  return response.data;
};
