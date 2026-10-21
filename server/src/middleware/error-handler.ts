import type { Request, Response, NextFunction } from "express";
export function notFound(_req: Request, res: Response) {
  res.status(404).json({ message: "Route not found" });
}
export function errorHandler(
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  const e = error as { statusCode?: number; message?: string };
  res
    .status(e.statusCode || 500)
    .json({ message: e.statusCode ? e.message : "Internal server error" });
}
