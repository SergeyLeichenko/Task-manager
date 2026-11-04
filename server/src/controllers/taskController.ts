// import type { Request, Response, NextFunction } from "express";
// import * as service from "../services/taskService";

// const wrap =
//   (fn: (req: Request, res: Response) => Promise<unknown>) =>
//   (req: Request, res: Response, next: NextFunction) => {
//     fn(req, res).catch(next);
//   };

// function id(req: Request) {
//   const n = Number(req.params.id);
//   if (!Number.isSafeInteger(n) || n < 1)
//     throw Object.assign(new Error("Invalid task id"), { statusCode: 400 });
//   return n;
// }

// export const list = wrap(async (_q, res) => {
//   res.json(await service.getTasks());
// });

// export const get = wrap(async (req, res) => {
//   res.json(await service.getTask(id(req)));
// });

// export const create = wrap(async (req, res) => {
//   res.status(201).json(await service.createTask(req.body));
// });

// export const update = wrap(async (req, res) => {
//   res.json(await service.updateTask(id(req), req.body));
// });

// export const remove = wrap(async (req, res) => {
//   await service.deleteTask(id(req));
//   res.status(204).send();
// });


import type { Request, Response } from "express";
import type { ResultSetHeader } from "mysql2";
import type { Task } from "../types/task";

import pool from "../database/pool";

export async function list(_req: Request, res: Response) {
  try {
    const [rows] = await pool.execute<Task[]>(
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

    const [rows] = await pool.execute<Task[]>(
      "SELECT * FROM tasks WHERE id = ? LIMIT 1",
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

    const [result] = await pool.execute<ResultSetHeader>(
      `INSERT INTO tasks (title, description, status, priority)
       VALUES (?, ?, ?, ?)`,
      [title, description ?? null, status ?? "todo", priority ?? "medium"],
    );

    const [rows] = await pool.execute<Task[]>(
      "SELECT * FROM tasks WHERE id = ?",
      [result.insertId],
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
    const values: (string | null)[] = [];

    if (title !== undefined) {
      fields.push("title = ?");
      values.push(title);
    }

    if (description !== undefined) {
      fields.push("description = ?");
      values.push(description);
    }

    if (status !== undefined) {
      fields.push("status = ?");
      values.push(status);
    }

    if (priority !== undefined) {
      fields.push("priority = ?");
      values.push(priority);
    }

    if (!fields.length) {
      return res.status(400).json({
        message: "No fields to update",
      });
    }

    values.push(String(id));

    const [result] = await pool.execute<ResultSetHeader>(
      `UPDATE tasks SET ${fields.join(", ")} WHERE id = ?`,
      values,
    );

    if (result.affectedRows === 0) {
      const [existing] = await pool.execute<Task[]>(
        "SELECT id FROM tasks WHERE id = ?",
        [id],
      );

      if (!existing.length) {
        return res.status(404).json({ message: "Task not found" });
      }
    }

    const [rows] = await pool.execute<Task[]>(
      "SELECT * FROM tasks WHERE id = ?",
      [id],
    );

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

    const [result] = await pool.execute<ResultSetHeader>(
      "DELETE FROM tasks WHERE id = ?",
      [id],
    );

    if (result.affectedRows === 0) {
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
