import mysql from "mysql2/promise";
import { env } from "../config/env";

export const pool = mysql.createPool({
  host: env.DB_HOST,
  port: env.DB_PORT,
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Перевірка підключення до бази даних
pool
  .getConnection()
  .then((connection) => {
    console.log("MySQL connected successfully");
    connection.release();
  })
  .catch((error) => {
    console.error("MySQL connection error:", error);
  });

export default pool;