import "dotenv/config";
import { z } from "zod";
export const env = z
  .object({
    PORT: z.coerce.number().default(3000),
    CLIENT_ORIGIN: z.string().default("http://localhost:5173"),
    DB_HOST: z.string().default("localhost"),
    DB_PORT: z.coerce.number().default(3306),
    DB_USER: z.string().default("root"),
    DB_PASSWORD: z.string().default(""),
    DB_NAME: z.string().default("task_manager"),
  })
  .parse(process.env);
