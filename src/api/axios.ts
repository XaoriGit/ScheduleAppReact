import axios from "axios";

export const api = axios.create({
  timeout: 10000,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(error);
    return Promise.reject(error);
  }
);

