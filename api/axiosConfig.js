import axios from "axios";

let uhfClient = axios.create({
  baseURL: "https://api.uhfindia.org/v1/dash",
  headers: {
    Authorization: "Bearer " + localStorage.getItem("uhf_jwt"),
  },
  timeout: 20000,
});

export const reconfigureAxios = () => {
  uhfClient = axios.create({
    baseURL: "https://api.uhfindia.org/v1/dash",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("uhf_jwt"),
    },
    timeout: 20000,
  });
};

export const axiosInstance = () => uhfClient;
