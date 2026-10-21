CREATE DATABASE IF NOT EXISTS task_manager CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE task_manager;
CREATE TABLE IF NOT EXISTS tasks (
 id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 title VARCHAR(180) NOT NULL,
 description TEXT NULL,
 status ENUM('todo','in_progress','done') NOT NULL DEFAULT 'todo',
 priority ENUM('low', 'medium', 'high') NOT NULL DEFAULT 'medium',
 created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
 updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
 INDEX idx_tasks_status(status)
);
