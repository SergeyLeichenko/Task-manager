import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { env } from "./config/env";
import tasksRoutes from "./routes/taskRoutes";
import authRoutes from "./routes/authRoutes";
import dashboardRoutes from "./routes/dashboardRoutes";

import { notFound, errorHandler } from "./middleware/error-handler";

export const app = express();

const allowedOrigins = ["http://localhost:5173", env.CLIENT_ORIGIN].filter(
  Boolean,
) as string[];

app.use(
  cors({
    origin: (origin, callback) => {
      // Дозволяємо запити без origin (наприклад, Postman або серверні запити) або зі списку дозволених
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`CORS blocked for origin: ${origin}`));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());
app.use(cookieParser());
app.get("/api/health", (_req, res) => res.json({ status: "ok" }));

app.use("/api/auth", authRoutes);
app.use("/api/tasks", tasksRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.use(notFound);
app.use(errorHandler);
