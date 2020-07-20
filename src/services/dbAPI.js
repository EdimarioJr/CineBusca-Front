import axios from "axios";
import auth from "./auth";

const dbAPI = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

dbAPI.interceptors.request.use(async (config) => {
  const token = auth.getToken();
  if (token) config.headers.authorization = token;
  return config;
});

export default dbAPI;