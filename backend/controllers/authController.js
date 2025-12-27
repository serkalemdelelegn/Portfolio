const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log('🔐 Login attempt:', { email, hasPassword: !!password });

    if (!email || !password) {
      console.log('❌ Missing email or password');
      return res.status(400).json({ error: 'Email and password required' });
    }

    // Check JWT_SECRET
    if (!process.env.JWT_SECRET) {
      console.error('❌ JWT_SECRET is not set in environment variables');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    // Find admin
    console.log('🔍 Looking for admin with email:', email);
    const admin = await Admin.findByEmail(email);
    
    if (!admin) {
      console.log('❌ Admin not found:', email);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    console.log('✅ Admin found:', admin.email);

    // Verify password
    console.log('🔑 Verifying password...');
    const isValid = await Admin.verifyPassword(password, admin.password_hash);
    
    if (!isValid) {
      console.log('❌ Password verification failed');
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    console.log('✅ Password verified');

    // Generate JWT token
    const token = jwt.sign(
      { email: admin.email, id: admin.id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    console.log('✅ Token generated');

    // Set cookie
    res.cookie('admin_token', token, {
      httpOnly: false, // Set to true in production with HTTPS
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    console.log('✅ Login successful for:', admin.email);

    res.json({
      token,
      email: admin.email
    });
  } catch (error) {
    console.error('❌ Login error:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({ 
      error: 'Login failed',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
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

