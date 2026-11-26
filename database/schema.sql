CREATE DATABASE IF NOT EXISTS task_manager CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE task_manager;

-- Tasks
CREATE TABLE IF NOT EXISTS tasks (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title VARCHAR(180) NOT NULL,
  description TEXT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'todo' CHECK (status IN ('todo', 'in_progress', 'done')),
  priority VARCHAR(20) NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Створення індексу в PostgreSQL виноситься в окрему команду
CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status);

-- Функція та тригер для автоматичного оновлення updated_at (аналог ON UPDATE CURRENT_TIMESTAMP у MySQL)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = CURRENT_TIMESTAMP;
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_tasks_updated_at ON tasks;
CREATE TRIGGER trigger_tasks_updated_at
BEFORE UPDATE ON tasks
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- На майбутнє (для зв'язку з таблицею users у PostgreSQL):
-- ALTER TABLE tasks
-- ADD COLUMN user_id BIGINT NULL,
-- ADD CONSTRAINT fk_tasks_user
-- FOREIGN KEY (user_id) REFERENCES users(id)
-- ON DELETE CASCADE;

-- Users
CREATE TABLE IF NOT EXISTS users (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Dashboard overview
CREATE TABLE IF NOT EXISTS dashboard_overview (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title VARCHAR(180) NOT NULL,
  icon VARCHAR(180),
  color_icon VARCHAR(180),
  background_color VARCHAR(180),
  count INT,
  link VARCHAR(180),
  link_name VARCHAR(180),
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);