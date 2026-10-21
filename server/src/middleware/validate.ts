import type { Request, Response, NextFunction } from "express";
import type { ZodSchema } from "zod";
export function validateBody(schema: ZodSchema) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
      next(
        Object.assign(
          new Error(parsed.error.issues.map((x) => x.message).join(", ")),
          { statusCode: 400 },
        ),
      );
      return;
    }
    req.body = parsed.data;
    next();
  };
}
