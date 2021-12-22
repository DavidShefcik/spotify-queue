import axios from "axios";

const api = axios.create({
  baseURL: "http://spotify.localhost/api", // TODO: Move this to an env variable
  timeout: 10000,
  withCredentials: true,
});

export { api };
