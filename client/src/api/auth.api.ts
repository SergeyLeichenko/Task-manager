import type { LoginPayload, User } from "@/types/auth";

import { http } from "./http";

const AUTH_ENDPOINT = "/auth";

export const authApi = {
  getMe: () => http.get<User>(`${AUTH_ENDPOINT}/me`),

  login: (payload: LoginPayload) =>
    http.post<User>(`${AUTH_ENDPOINT}/login`, payload),

  logout: (id: number) => http.post<User>(`${AUTH_ENDPOINT}/logout`, id),
};