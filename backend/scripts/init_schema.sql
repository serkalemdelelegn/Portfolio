-- Portfolio Database Schema for MySQL
-- This script creates the necessary tables for Serkalem's portfolio CMS

-- Admin Users Table
CREATE TABLE IF NOT EXISTS admin_users (
  id VARCHAR(36) PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- About Me Content
CREATE TABLE IF NOT EXISTS about_content (
  id VARCHAR(36) PRIMARY KEY,
  content TEXT NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  updated_by VARCHAR(36),
  FOREIGN KEY (updated_by) REFERENCES admin_users(id) ON DELETE SET NULL
);

-- Projects
CREATE TABLE IF NOT EXISTS projects (
  id VARCHAR(36) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  technologies JSON,
  github_link VARCHAR(500),
  demo_link VARCHAR(500),
  image_url VARCHAR(500),
  display_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  created_by VARCHAR(36),
  FOREIGN KEY (created_by) REFERENCES admin_users(id) ON DELETE SET NULL
);

-- Skills
CREATE TABLE IF NOT EXISTS skills (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  category VARCHAR(50) NOT NULL,
  level VARCHAR(20) NOT NULL,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  created_by VARCHAR(36),
  FOREIGN KEY (created_by) REFERENCES admin_users(id) ON DELETE SET NULL
);

-- Work Experience / Achievements
CREATE TABLE IF NOT EXISTS experiences (
  id VARCHAR(36) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  company VARCHAR(255) NOT NULL,
  date_range VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  type VARCHAR(50) NOT NULL,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  created_by VARCHAR(36),
  FOREIGN KEY (created_by) REFERENCES admin_users(id) ON DELETE SET NULL
);

-- Contact Messages
CREATE TABLE IF NOT EXISTS contact_messages (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  `read` BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX idx_projects_display_order ON projects(display_order);
CREATE INDEX idx_skills_category ON skills(category);
CREATE INDEX idx_skills_display_order ON skills(display_order);
CREATE INDEX idx_experiences_display_order ON experiences(display_order);
CREATE INDEX idx_contact_messages_read ON contact_messages(read);

-- Insert demo admin user (password: password123)
-- Password hash for 'password123' using bcrypt
-- Note: Generate UUID in application code, using a placeholder here
INSERT INTO admin_users (id, email, password_hash) 
VALUES ('00000000-0000-0000-0000-000000000001', 'admin@example.com', '$2b$10$YIjlrjzVHDfCKxKv3I5qOu.GH8nVmOPrKWCx8CY3N6FPUQqmZKDQq')
ON DUPLICATE KEY UPDATE email = email;

-- Insert sample about content
INSERT INTO about_content (id, content)
SELECT '00000000-0000-0000-0000-000000000002', 'I''m a passionate full-stack developer with a love for creating beautiful, functional digital experiences. With expertise in modern JavaScript frameworks, I craft solutions that bridge the gap between design and functionality.'
WHERE NOT EXISTS (SELECT 1 FROM about_content LIMIT 1);

