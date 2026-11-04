import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in .env");
}

export const generateToken = (userId: number): string => {
  return jwt.sign({ sub: userId }, JWT_SECRET, { expiresIn: "1d" });
};

export const verifyToken = (token: string): number => {
  const decoded = jwt.verify(token, JWT_SECRET);

  if (typeof decoded === "string" || !decoded.sub) {
    throw new Error("Invalid token");
  }

  const userId = Number(decoded.sub);

  if (!Number.isInteger(userId) || userId <= 0) {
    throw new Error("Invalid user ID");
  }

  return userId;
};
