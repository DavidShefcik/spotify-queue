import axios, { AxiosError } from "axios";

import {
  AuthCheckResponse,
  LoginResponse,
  LoginCallbackResponse,
  LoginCallbackBody,
} from "./types";
import { API_ERRORS } from "~/constants/apiErrors";

enum HTTP_METHODS {
  GET = "get",
  POST = "post",
  PATCH = "patch",
  DELETE = "delete",
}

interface APIResponse<T> {
  response?: T;
  error?: {
    message: string;
    status_code: number;
  };
}

const apiAxiosClient = axios.create({
  baseURL: "http://spotify.localhost/api", // TODO: Move this to an env variable
  timeout: 10000,
  withCredentials: true,
});

const makeRequest = async <Response = undefined, Body = undefined>({
  url,
  method = HTTP_METHODS.GET,
  data,
}: {
  url: string;
  method?: HTTP_METHODS;
  data?: Body;
}): Promise<APIResponse<Response>> => {
  try {
    const { data: responseData } = await apiAxiosClient[method]<Response>(
      url,
      data
    );

    return {
      response: responseData,
    };
  } catch (error) {
    console.log(error);

    const errorAsAxiosError = error as AxiosError;
    const { response } = errorAsAxiosError;

    if (!response) {
      return {
        error: {
          status_code: 404,
          message: API_ERRORS["connection_failed"],
        },
      };
    }

    const { status, data } = response;

    return {
      error: {
        status_code: status,
        message: data,
      },
    };
  }
};

const api = {
  // Auth
  authCheck: async () =>
    await makeRequest<AuthCheckResponse>({
      url: "/auth/check",
    }),
  login: async () =>
    await makeRequest<LoginResponse>({
      url: "/auth/login",
    }),
  loginCallback: async (data: LoginCallbackBody) =>
    await makeRequest<LoginCallbackResponse, LoginCallbackBody>({
      url: "/auth/login/callback",
      method: HTTP_METHODS.POST,
      data,
    }),
  logout: async () =>
    await makeRequest({
      url: "/auth/logout",
      method: HTTP_METHODS.POST,
    }),
};

export { apiAxiosClient, api };
