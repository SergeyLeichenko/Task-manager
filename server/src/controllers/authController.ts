import type { Request, Response } from "express";
import bcrypt from "bcryptjs";

import { pool } from "../database/pool";
import { generateToken } from "../utils/token";

import type { User } from "../types/auth";

const COOKIE_NAME = "access_token";

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: (process.env.NODE_ENV === "production" ? "none" : "lax") as
    | "none"
    | "lax",
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

    const { rows } = await pool.query(
      "SELECT id, email, password FROM users WHERE email = $1 LIMIT 1",
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

export async function registration(req: Request, res: Response) {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (
      typeof firstName !== "string" ||
      typeof lastName !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string" ||
      !firstName.trim() ||
      !lastName.trim() ||
      !email.trim() ||
      !password
    ) {
      return res.status(400).json({
        message: "First name, last name, email, password are required",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Check if user already exists
    const { rows: existingUsers } = await pool.query<User>(
      "SELECT id FROM users WHERE email = $1 LIMIT 1",
      [normalizedEmail],
    );

    if (existingUsers.length > 0) {
      return res.status(409).json({
        message: "User with this email already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create and return user in one query
    const { rows } = await pool.query<User>(
      `INSERT INTO users ("first_name", "last_name", email, password)
       VALUES ($1, $2, $3, $4)
       RETURNING id, "first_name", "last_name", email`,
      [firstName.trim(), lastName.trim(), normalizedEmail, hashedPassword],
    );

    return res.status(201).json({
      message: "Registration successful",
      user: rows[0],
    });
  } catch (error) {
    console.error("Registration error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

export async function getMe(req: Request, res: Response) {
  try {
    const userId = (req as any).userId;

    const { rows } = await pool.query<User>(
      'SELECT id, "first_name", "last_name", email FROM users WHERE id = $1 LIMIT 1',
      [userId],
    );

    const user = rows[0];

    if (!user) {
      res.clearCookie(COOKIE_NAME, { path: "/" });

      return res.status(401).json({
        message: "User not found",
      });
    }

    return res.status(200).json(user);
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
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    path: "/",
  });

  return res.status(200).json({
    message: "Logout successful",
  });
}
