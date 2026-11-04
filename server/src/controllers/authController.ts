import type { Request, Response } from "express";
import bcrypt from "bcryptjs";

import pool from "../database/pool";
import { generateToken } from "../utils/token";

const COOKIE_NAME = "access_token";

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  maxAge: 24 * 60 * 60 * 1000,
  path: "/",
};

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    if (
      typeof email !== "string" ||
      typeof password !== "string" ||
      !email.trim() ||
      !password
    ) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const [rows]: any = await pool.execute(
      "SELECT id, email, password FROM users WHERE email = ? LIMIT 1",
      [email.trim().toLowerCase()],
    );

    const user = rows[0];

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const token = generateToken(user.id);

    res.cookie(COOKIE_NAME, token, cookieOptions);

    return res.status(200).json({
      message: "Login successful",
      user: {
        id: user.id,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

export async function getMe(req: Request, res: Response) {
  try {
    const userId = (req as any).userId;

    const [rows]: any = await pool.execute(
      "SELECT id, email FROM users WHERE id = ? LIMIT 1",
      [userId],
    );

    const user = rows[0];

    if (!user) {
      res.clearCookie(COOKIE_NAME, { path: "/" });

      return res.status(401).json({
        message: "User not found",
      });
    }

    return res.status(200).json({ user });
  } catch (error) {
    console.error("Get user error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

export function logout(_req: Request, res: Response) {
  res.clearCookie(COOKIE_NAME, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  return res.status(200).json({
    message: "Logout successful",
  });
}
