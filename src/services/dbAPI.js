import axios from "axios";
import auth from "./auth";

const dbAPI = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// sending the jwt token automatically in the requests
dbAPI.interceptors.request.use(async (config) => {
  const token = auth.getToken();
  if (token) config.headers.authorization = token;
  return config;
});

export default dbAPI;
