const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    // Find admin
    const admin = await Admin.findByEmail(email);
    if (!admin) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Verify password
    const isValid = await Admin.verifyPassword(password, admin.password_hash);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { email: admin.email, id: admin.id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    // Set cookie
    res.cookie('admin_token', token, {
      httpOnly: false, // Set to true in production with HTTPS
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.json({
      token,
      email: admin.email
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
};

const verify = async (req, res) => {
  try {
    // If middleware passed, admin is authenticated
    res.json({ 
      authenticated: true,
      email: req.admin.email 
    });
  } catch (error) {
    res.status(500).json({ error: 'Verification failed' });
  }
};

module.exports = {
  login,
  verify
};

