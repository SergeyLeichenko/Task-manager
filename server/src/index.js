import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { pool } from './db.js';

const app = express();
const port = Number(process.env.PORT || 3000);
const allowedOrigin = process.env.CLIENT_ORIGIN || 'http://localhost:5173';

app.use(cors({ origin: allowedOrigin }));
app.use(express.json({ limit: '20kb' }));

app.get('/api/health', async (_req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ status: 'ok', database: 'connected' });
  } catch {
    res.status(503).json({ status: 'error', database: 'unavailable' });
  }
});

app.get('/api/tasks', async (_req, res, next) => {
  try {
    const [rows] = await pool.query(
      "SELECT id, title, description, status, priority, created_at, updated_at FROM tasks ORDER BY created_at DESC",
    );
    res.json(rows);
  } catch (error) {
    next(error);
  }
});

app.post('/api/tasks', async (req, res, next) => {
  const title = typeof req.body.title === 'string' ? req.body.title.trim() : '';
  const description = typeof req.body.description === 'string' ? req.body.description.trim() : '';
  const status = req.body.status;
  const priority = req.body.priority;

  const allowedStatuses = ["todo", "in_progress", "done"];
  const allowedPriorities = ["low", "medium", "high"];

  if (!title || title.length > 120) {
    return res.status(400).json({ message: 'Title is required and must be 120 characters or fewer.' });
  }

  if (description.length > 500) {
    return res.status(400).json({ message: 'Description must be 500 characters or fewer.' });
  }

  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({
      message: "Invalid task status.",
    });
  }

  if (!allowedPriorities.includes(priority)) {
    return res.status(400).json({
      message: "Invalid task priority.",
    });
  }

  try {
    const [result] = await pool.execute(
      "INSERT INTO tasks (title, description, status, priority) VALUES (?, ?, ?, ?)",
      [title, description, status, priority],
    );
    const [rows] = await pool.execute(
      'SELECT id, title, description, status, priority, created_at, updated_at FROM tasks WHERE id = ?',
      [result.insertId]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    next(error);
  }
});

app.patch('/api/tasks/:id', async (req, res, next) => {
  const id = Number(req.params.id);
  const allowedStatuses = ["todo", "in_progress", "done"];
  const status = req.body.status;

  if (!Number.isSafeInteger(id) || id < 1) {
    return res.status(400).json({ message: 'Invalid task ID.' });
  }
  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({ message: 'Invalid task status.' });
  }

  try {
    const [result] = await pool.execute('UPDATE tasks SET status = ? WHERE id = ?', [status, id]);
    if (!result.affectedRows) return res.status(404).json({ message: 'Task not found.' });
    const [rows] = await pool.execute(
      'SELECT id, title, description, status, created_at, updated_at FROM tasks WHERE id = ?',
      [id]
    );
    res.json(rows[0]);
  } catch (error) {
    next(error);
  }
});

app.delete('/api/tasks/:id', async (req, res, next) => {
  const id = Number(req.params.id);
  if (!Number.isSafeInteger(id) || id < 1) {
    return res.status(400).json({ message: 'Invalid task ID.' });
  }

  try {
    const [result] = await pool.execute('DELETE FROM tasks WHERE id = ?', [id]);
    if (!result.affectedRows) return res.status(404).json({ message: 'Task not found.' });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

app.use((error, _req, res, _next) => {
  console.error("DATABASE ERROR:", error);
  res.status(500).json({ message: 'Something went wrong on the server.' });
});

app.listen(port, () => {
  console.log(`Task Manager API listening on http://localhost:${port}`);
});
