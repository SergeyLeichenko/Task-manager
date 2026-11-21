import type { Request, Response } from "express";
import type { Task } from "../types/task";
import { pool } from "../database/pool";

export async function list(_req: Request, res: Response) {
  try {
    const { rows } = await pool.query<Task>(
      "SELECT * FROM tasks ORDER BY created_at DESC",
    );

    return res.status(200).json(rows);
  } catch (error) {
    console.error("Get tasks error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

export async function get(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    if (!Number.isSafeInteger(id) || id < 1) {
      return res.status(400).json({ message: "Invalid task id" });
    }

    const { rows } = await pool.query<Task>(
      "SELECT * FROM tasks WHERE id = $1 LIMIT 1",
      [id],
    );

    if (!rows.length) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.status(200).json(rows[0]);
  } catch (error) {
    console.error("Get task error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

export async function create(req: Request, res: Response) {
  try {
    const { title, description, status, priority } = req.body;

    const { rows } = await pool.query<Task>(
      `INSERT INTO tasks (title, description, status, priority)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [title, description ?? null, status ?? "todo", priority ?? "medium"],
    );

    return res.status(201).json(rows[0]);
  } catch (error) {
    console.error("Create task error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

export async function update(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    if (!Number.isSafeInteger(id) || id < 1) {
      return res.status(400).json({ message: "Invalid task id" });
    }

    const { title, description, status, priority } = req.body;

    const fields: string[] = [];
    const values: (string | number | null)[] = [];
    let paramIndex = 1;

    if (title !== undefined) {
      fields.push(`title = $${paramIndex++}`);
      values.push(title);
    }

    if (description !== undefined) {
      fields.push(`description = $${paramIndex++}`);
      values.push(description);
    }

    if (status !== undefined) {
      fields.push(`status = $${paramIndex++}`);
      values.push(status);
    }

    if (priority !== undefined) {
      fields.push(`priority = $${paramIndex++}`);
      values.push(priority);
    }

    if (!fields.length) {
      return res.status(400).json({
        message: "No fields to update",
      });
    }

    values.push(id);

    const { rows } = await pool.query<Task>(
      `UPDATE tasks SET ${fields.join(", ")} WHERE id = $${paramIndex} RETURNING *`,
      values,
    );

    if (!rows.length) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.status(200).json(rows[0]);
  } catch (error) {
    console.error("Update task error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

export async function remove(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    if (!Number.isSafeInteger(id) || id < 1) {
      return res.status(400).json({ message: "Invalid task id" });
    }

    const result = await pool.query("DELETE FROM tasks WHERE id = $1", [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.status(204).send();
  } catch (error) {
    console.error("Delete task error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
}
