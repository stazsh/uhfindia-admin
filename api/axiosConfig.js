import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://api.uhfindia.org/v1/dash",
  headers: {
    Authorization: "Bearer " + localStorage.getItem("uhf_jwt"),
  },
  timeout: 20000,
});
