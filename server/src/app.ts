import express from "express";
import cors from "cors";
import { env } from "./config/env";
import tasks from "./routes/task.routes";
import { notFound, errorHandler } from "./middleware/error-handler";

export const app = express();

app.use(cors({ origin: env.CLIENT_ORIGIN }));
app.use(express.json());
app.get("/api/health", (_req, res) => res.json({ status: "ok" }));
app.use("/api/tasks", tasks);
app.use(notFound);
app.use(errorHandler);
