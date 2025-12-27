// Script to verify admin credentials in database
require('dotenv').config();
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');

async function verifyAdmin() {
  let connectionConfig;

  if (process.env.DATABASE_URL) {
    const url = new URL(process.env.DATABASE_URL);
    connectionConfig = {
      host: url.hostname,
      port: url.port || 3306,
      user: url.username,
      password: url.password,
      database: url.pathname.slice(1),
    };
  } else {
    connectionConfig = {
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'portfolio_db',
    };
  }

  try {
    const connection = await mysql.createConnection(connectionConfig);
    console.log('✅ Connected to database');

    // Check admin users
    const [admins] = await connection.execute(
      'SELECT id, email, password_hash FROM admin_users'
    );

    console.log(`\n📊 Found ${admins.length} admin user(s):\n`);

    for (const admin of admins) {
      console.log(`Email: ${admin.email}`);
      console.log(`ID: ${admin.id}`);
      console.log(`Password Hash: ${admin.password_hash.substring(0, 20)}...`);
      
      // Test password verification
      const testPassword = 'serk1234';
      const isValid = await bcrypt.compare(testPassword, admin.password_hash);
      console.log(`Password 'serk1234' valid: ${isValid ? '✅ YES' : '❌ NO'}`);
      console.log('---');
    }

    // Check JWT_SECRET
    console.log(`\n🔑 JWT_SECRET: ${process.env.JWT_SECRET ? '✅ Set (' + process.env.JWT_SECRET.substring(0, 20) + '...)' : '❌ NOT SET'}`);

    await connection.end();
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

verifyAdmin();

