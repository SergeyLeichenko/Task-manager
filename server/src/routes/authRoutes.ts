import { Router } from "express";
import rateLimit from "express-rate-limit";

import { login, getMe, logout } from "../controllers/authController";

import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    message: "Too many login attempts. Try again later.",
  },
});

router.post("/login", loginLimiter, login);
router.get("/me", authMiddleware, getMe);
router.post("/logout", logout);

export default router;
