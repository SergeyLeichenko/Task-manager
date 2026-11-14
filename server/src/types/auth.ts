import type { RowDataPacket } from "mysql2";

export interface User extends RowDataPacket {
  id: number;
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  created_at: string;
}
