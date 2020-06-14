import axios from "axios";

export const instance = axios.create({
  timeout: 5000,
  baseURL: "devApi",
});

instance.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);
