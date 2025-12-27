-- Update admin credentials script
-- Run this if you already have the database set up
-- Usage: mysql -u root -p portfolio_db < update-admin-credentials.sql

USE portfolio_db;

-- Update admin email and password
UPDATE admin_users 
SET email = 'admin@gmail.com', 
    password_hash = '$2a$10$PEkNnz/lSwAgZAhs7WlbgO6SDJZaTfF/ZUgw7OR4dXEaOgl3nx5v6'
WHERE email = 'admin@example.com' 
   OR id = '00000000-0000-0000-0000-000000000001';

-- If no admin exists, create one
INSERT INTO admin_users (id, email, password_hash) 
VALUES ('00000000-0000-0000-0000-000000000001', 'admin@gmail.com', '$2a$10$PEkNnz/lSwAgZAhs7WlbgO6SDJZaTfF/ZUgw7OR4dXEaOgl3nx5v6')
ON DUPLICATE KEY UPDATE email = 'admin@gmail.com', password_hash = '$2a$10$PEkNnz/lSwAgZAhs7WlbgO6SDJZaTfF/ZUgw7OR4dXEaOgl3nx5v6';

SELECT 'Admin credentials updated successfully!' as message;
SELECT email, 'Password: serk1234' as password_info FROM admin_users WHERE email = 'admin@gmail.com';

