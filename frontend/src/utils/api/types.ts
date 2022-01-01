// Responses
export type AuthCheckResponse = User;
export interface LoginResponse {
  oauth_url: string;
}
export type LoginCallbackResponse = User & { localToken: string };

// Request bodies
export interface LoginCallbackBody {
  code: string;
}
