CREATE DATABASE IF NOT EXISTS task_manager CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE task_manager;
-- Tasks
CREATE TABLE IF NOT EXISTS tasks (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(180) NOT NULL,
  description TEXT NULL,
  status ENUM('todo','in_progress','done') NOT NULL DEFAULT 'todo',
  priority ENUM('low', 'medium', 'high') NOT NULL DEFAULT 'medium',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_tasks_status(status)
  -- Ще одна рекомендація: якщо плануєш підтримувати кількох користувачів, потрібно додати user_id до таблиці tasks. Інакше всі авторизовані користувачі бачитимуть спільний список задач.
-- Для цього можна буде зробити зв'язок:

  -- ALTER TABLE tasks
  -- ADD COLUMN user_id INT UNSIGNED NULL,
  -- ADD CONSTRAINT fk_tasks_user
  -- FOREIGN KEY (user_id) REFERENCES users(id)
  -- ON DELETE CASCADE;
);

-- Users
CREATE TABLE IF NOT EXISTS users (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
