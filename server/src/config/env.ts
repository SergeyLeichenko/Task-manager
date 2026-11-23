import "dotenv/config";
import { z } from "zod";
export const env = z
  .object({
    PORT: z.coerce.number().default(3000),
    CLIENT_ORIGIN: z.string().default("http://localhost:5173"),
    DATABASE_URL: z.string().default(""),
    DB_NAME: z.string().default("task_manager"),
    JWT_SECRET: z.string().default(""),
    NODE_ENV: z.string().default("development"),
  })
  .parse(process.env);
