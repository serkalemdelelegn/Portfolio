-- Portfolio Database Schema
-- This script creates the necessary tables for Serkalem's portfolio CMS

-- Admin Users Table
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- About Me Content
CREATE TABLE IF NOT EXISTS about_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content TEXT NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_by UUID REFERENCES admin_users(id)
);

-- Projects
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  technologies TEXT[] NOT NULL,
  github_link VARCHAR(500),
  demo_link VARCHAR(500),
  image_url VARCHAR(500),
  display_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by UUID REFERENCES admin_users(id)
);

-- Skills
CREATE TABLE IF NOT EXISTS skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  category VARCHAR(50) NOT NULL,
  level VARCHAR(20) NOT NULL,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by UUID REFERENCES admin_users(id)
);

-- Work Experience / Achievements
CREATE TABLE IF NOT EXISTS experiences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  company VARCHAR(255) NOT NULL,
  date_range VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  type VARCHAR(50) NOT NULL,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by UUID REFERENCES admin_users(id)
);

-- Contact Messages
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX idx_projects_display_order ON projects(display_order);
CREATE INDEX idx_skills_category ON skills(category);
CREATE INDEX idx_skills_display_order ON skills(display_order);
CREATE INDEX idx_experiences_display_order ON experiences(display_order);
CREATE INDEX idx_contact_messages_read ON contact_messages(read);

-- Insert demo admin user (password: password123)
INSERT INTO admin_users (email, password_hash) 
VALUES ('admin@example.com', '$2b$10$YIjlrjzVHDfCKxKv3I5qOu.GH8nVmOPrKWCx8CY3N6FPUQqmZKDQq')
ON CONFLICT (email) DO NOTHING;

-- Insert sample about content
INSERT INTO about_content (content)
SELECT 'I''m a passionate full-stack developer with a love for creating beautiful, functional digital experiences. With expertise in modern JavaScript frameworks, I craft solutions that bridge the gap between design and functionality.'
WHERE NOT EXISTS (SELECT 1 FROM about_content);
