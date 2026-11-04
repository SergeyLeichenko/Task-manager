import type { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/token";

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const token = req.cookies?.access_token;

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const userId = verifyToken(token);

    (req as any).userId = userId;

    next();
  } catch {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
}
