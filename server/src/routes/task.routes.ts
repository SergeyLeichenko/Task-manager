import { Router } from "express";
import { z } from "zod";
import * as c from "../controllers/task.controller";
import { validateBody } from "../middleware/validate";
const router = Router();

router.get("/", c.list);

router.get("/:id", c.get);

router.post(
  "/",
  validateBody(
    z.object({
      title: z.string().trim().min(1).max(180),
      description: z.string().max(2000).optional(),
      status: z.enum(["todo", "in_progress", "done"]).optional(),
      priority: z.enum(["low", "medium", "high"]).optional(),
    }),
  ),
  c.create,
);

router.patch(
  "/:id",
  validateBody(
    z
      .object({
        title: z.string().trim().min(1).max(180).optional(),
        description: z.string().max(2000).nullable().optional(),
        status: z.enum(["todo", "in_progress", "done"]).optional(),
        priority: z.enum(["low", "medium", "high"]).optional()
      })
      .refine((v) => Object.keys(v).length > 0),
  ),
  c.update,
);

router.put(
  "/:id",
  validateBody(
    z
      .object({
        title: z.string().trim().min(1).max(180).optional(),
        description: z.string().max(2000).nullable().optional(),
        status: z.enum(["todo", "in_progress", "done"]).optional(),
        priority: z.enum(["low", "medium", "high"]).optional(),
      })
      .refine((v) => Object.keys(v).length > 0),
  ),
  c.update,
);

router.delete("/:id", c.remove);

export default router;
