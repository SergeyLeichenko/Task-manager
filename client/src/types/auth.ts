export interface LoginPayload {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
}

export interface User {
  id: number;
  email: string;
  firstName?: string |undefined;
  lastName?: string | undefined;
}
