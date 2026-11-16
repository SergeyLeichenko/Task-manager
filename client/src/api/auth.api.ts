import type { LoginPayload, User } from "@/types/auth";

import { http } from "./http";

const AUTH_ENDPOINT = "/auth";

export const authApi = {
  getMe: () => http.get<User>(`${AUTH_ENDPOINT}/me`),

  login: (payload: LoginPayload) =>
    http.post<User>(`${AUTH_ENDPOINT}/login`, payload),

  registration: (payload: LoginPayload) =>
    http.post<User>(`${AUTH_ENDPOINT}/registration`, payload),

  logout: () => http.post(`${AUTH_ENDPOINT}/logout`),
};