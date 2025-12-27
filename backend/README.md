# Portfolio Backend API

Backend API server for the Portfolio CMS application built with Express.js and MySQL.

## Features

- RESTful API endpoints
- JWT-based authentication
- PostgreSQL database integration
- CRUD operations for Projects, Skills, Experience, and About content
- Contact message handling
- CORS enabled for frontend integration

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Copy `.env.example` to `.env` and configure:

```env
# Option 1: Use DATABASE_URL (MySQL connection string)
DATABASE_URL=mysql://user:password@localhost:3306/portfolio_db

# Option 2: Use individual connection parameters
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=portfolio_db

JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### 3. Database Setup

**Option A: Using MySQL Command Line (Recommended)**

1. Open MySQL command line client:
   - If MySQL is installed, open Command Prompt and run:
   ```bash
   mysql -u root -p
   ```
   - Enter your MySQL root password when prompted

2. Create the database:
   ```sql
   CREATE DATABASE portfolio_db;
   USE portfolio_db;
   ```

3. Run the schema file:
   ```sql
   source backend/scripts/init_schema.sql
   ```
   Or exit MySQL and run:
   ```bash
   mysql -u root -p portfolio_db < backend/scripts/init_schema.sql
   ```

**Option B: Using MySQL Workbench or phpMyAdmin**

1. Open MySQL Workbench or phpMyAdmin
2. Connect to your MySQL server
3. Create a new database named `portfolio_db`
4. Select the database
5. Run the SQL from `backend/scripts/init_schema.sql` in the query editor

**Option C: Using XAMPP/WAMP (Windows)**

1. Start MySQL service from XAMPP/WAMP control panel
2. Open phpMyAdmin (usually at http://localhost/phpmyadmin)
3. Click "New" to create a new database
4. Name it `portfolio_db`
5. Select the database and go to "Import" tab
6. Upload and run `backend/scripts/init_schema.sql`

### 4. Run the Server

**Development:**
```bash
npm run dev
```

**Production:**
```bash
npm start
```

## Admin Login Credentials

**Default Admin Account:**
- **Email:** `admin@gmail.com`
- **Password:** `serk1234`

> ⚠️ **Important:** Change these credentials in production! Update the password hash in the database after running the schema.

## API Endpoints

### Authentication
- `POST /api/admin/login` - Admin login
- `GET /api/auth/verify` - Verify token (protected)

### About
- `GET /api/about` - Get about content
- `POST /api/admin/about` - Update about content (protected)

### Projects
- `GET /api/projects` - Get all projects
- `POST /api/admin/projects` - Create project (protected)
- `PUT /api/admin/projects/:id` - Update project (protected)
- `DELETE /api/admin/projects/:id` - Delete project (protected)

### Skills
- `GET /api/skills` - Get all skills (grouped by category for public)
- `POST /api/admin/skills` - Create skill (protected)
- `PUT /api/admin/skills/:id` - Update skill (protected)
- `DELETE /api/admin/skills/:id` - Delete skill (protected)

### Experience
- `GET /api/experience` - Get all experiences
- `POST /api/admin/experience` - Create experience (protected)
- `PUT /api/admin/experience/:id` - Update experience (protected)
- `DELETE /api/admin/experience/:id` - Delete experience (protected)

### Contact
- `POST /api/contact` - Submit contact message
- `GET /api/contact` - Get all messages (protected)
- `PATCH /api/contact/:id/read` - Mark message as read (protected)

## Authentication

Protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

Or as a cookie named `admin_token`.

## Project Structure

```
backend/
├── config/          # Configuration files (database, cloudinary)
├── constant/        # Constants and utilities
├── controllers/     # Business logic controllers
├── middlewares/     # Express middlewares (auth, upload)
├── models/          # Database models
├── routes/          # API route definitions
├── app.js           # Express app configuration
├── server.js        # Server entry point
└── package.json     # Dependencies
```

## Development

The server uses `nodemon` in development mode for automatic restarts on file changes.

## Production

Make sure to:
- Set `NODE_ENV=production`
- Use a strong `JWT_SECRET`
- Enable HTTPS
- Set `httpOnly: true` for cookies
- Configure proper CORS origins

