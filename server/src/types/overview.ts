import type { RowDataPacket } from "mysql2";

export interface Overview extends RowDataPacket {
  id: number;
  title: string;
  icon?: string | null;
  countTasks: number;
  link?: string | null;
  linkName: string;
}
