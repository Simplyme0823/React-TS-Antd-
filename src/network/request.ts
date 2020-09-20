/** @format */
import { message } from "antd";
import axios from "axios";
import { getToken, getUserName } from "../utils/session";
export const instance = axios.create({
  timeout: 5000,
  baseURL: "/devApi",
});

instance.interceptors.request.use(
  config => {
    config.headers["Token"] = getToken();
    config.headers["Username"] = getUserName();
    return config;
  },
  error => Promise.reject(error),
);

instance.interceptors.response.use(
  response => {
    const { resCode, message: Message } = response.data;
    if (resCode === 0) {
      return response;
    }
    message.error(Message);
    return Promise.reject(response);
  },
  error => Promise.reject(error),
);
