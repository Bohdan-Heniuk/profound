import axios from "axios";

export const config = {
  serverUrl: "http://localhost:5000",
};

export const authorizedAxios = axios.create({
  baseURL: config.serverUrl,
  headers: {
    authorization: localStorage.getItem("token"),
  },
});

export const unAuthorizedAxios = axios.create({
  baseURL: config.serverUrl,
});
