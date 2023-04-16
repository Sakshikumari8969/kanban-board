import axios from "axios";

export const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth-token");
  if (token) {
    config.headers.Authorization = token;
  }

  return config;
});
