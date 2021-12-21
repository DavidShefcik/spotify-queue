import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5263", // TODO: Move this to an env variable
  timeout: 10000,
  withCredentials: true,
});

export { api };
