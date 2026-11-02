import type { ResultSetHeader, RowDataPacket } from "mysql2";
import { pool } from "../database/pool";
import type { Task, CreateTaskInput, UpdateTaskInput } from "../types/task";

type TaskRow = Task & RowDataPacket;

export async function findAll() {
  const [rows] = await pool.query<TaskRow[]>(
    "SELECT * FROM tasks ORDER BY created_at DESC",
  );
  return rows;
}

export async function findById(id: number) {
  const [rows] = await pool.execute<TaskRow[]>(
    "SELECT * FROM tasks WHERE id=?",
    [id],
  );
  return rows[0] ?? null;
}

export async function create(input: CreateTaskInput) {
  const [r] = await pool.execute<ResultSetHeader>(
    "INSERT INTO tasks(title, description, status, priority) VALUES(?, ?, ?, ?)",
    [
      input.title,
      input.description?.trim() || null,
      input.status ?? "todo",
      input.priority ?? "medium",
    ],
  );

  return (await findById(r.insertId))!;
}

export async function update(id: number, input: UpdateTaskInput) {
  const fields: string[] = [];
  const vals: (string | number | null)[] = [];
  
  for (const key of ["title", "description", "status", "priority"] as const) {
    if (input[key] !== undefined) {
      fields.push(`${key}=?`);
      vals.push(input[key]);
    }
  }
  if (fields.length) {
    vals.push(id);
    await pool.execute(`UPDATE tasks SET ${fields.join(",")} WHERE id=?`, vals);
  }
  return findById(id);
}

export async function remove(id: number) {
  const [r] = await pool.execute<ResultSetHeader>(
    "DELETE FROM tasks WHERE id=?",
    [id],
  );
  return r.affectedRows > 0;
}
