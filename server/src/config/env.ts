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
    JWT_SECRET: z
      .string()
      .default(
        "0a29b8c1863039674889c55d118484aa7239907a95fd0f2245214e5cc86302dd3d839126d80a9ccc69f17d49389076e3eb3daeae70c6e114f3572286d8bc8e01",
      ),
    NODE_ENV: z.string().default("development"),
  })
  .parse(process.env);
