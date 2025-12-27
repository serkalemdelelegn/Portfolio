const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Database connection test endpoint
app.get('/api/test-db', async (req, res) => {
  try {
    const pool = require('./config/db');
    const [rows] = await pool.execute('SELECT 1 as test');
    res.json({ 
      status: 'OK', 
      message: 'Database connection successful',
      test: rows[0]
    });
  } catch (error) {
    console.error('Database test error:', error);
    res.status(500).json({ 
      status: 'ERROR', 
      message: 'Database connection failed',
      error: error.message,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/about', require('./routes/aboutRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/skills', require('./routes/skillRoutes'));
app.use('/api/experience', require('./routes/experienceRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));

// Admin routes (with /admin prefix to match frontend)
app.use('/api/admin/login', require('./routes/authRoutes'));
app.use('/api/admin/about', require('./routes/aboutRoutes'));
app.use('/api/admin/projects', require('./routes/projectRoutes'));
app.use('/api/admin/skills', require('./routes/skillRoutes'));
app.use('/api/admin/experience', require('./routes/experienceRoutes'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('❌ Error:', err);
  console.error('Stack:', err.stack);
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

module.exports = app;

