import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://api.uhfindia.org/v1/dash",
  timeout: 5000,
});
