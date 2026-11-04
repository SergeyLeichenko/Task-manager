import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { env } from "./config/env";
import tasksRoutes from "./routes/taskRoutes";
import authRoutes from "./routes/authRoutes";

import { notFound, errorHandler } from "./middleware/error-handler";

export const app = express();

app.use(cors({ origin: env.CLIENT_ORIGIN, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.get("/api/health", (_req, res) => res.json({ status: "ok" }));

app.use("/api/auth", authRoutes);
app.use("/api/tasks", tasksRoutes);
app.use(notFound);
app.use(errorHandler);
