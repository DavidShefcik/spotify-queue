import axios from "axios";

// TODO: Wrapper around the API to call the methods easier. That
// way we could also inform the user if they were logged out
// in the middle of their session (cookie expired)
const api = axios.create({
  baseURL: "http://spotify.localhost/api", // TODO: Move this to an env variable
  timeout: 10000,
  withCredentials: true,
});

export { api };
