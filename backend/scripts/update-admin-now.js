// Script to update admin credentials in database
require('dotenv').config();
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');

async function updateAdmin() {
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

    const newEmail = 'admin@gmail.com';
    const newPassword = 'serk1234';

    // Generate new password hash
    console.log('🔑 Generating password hash...');
    const passwordHash = await bcrypt.hash(newPassword, 10);
    console.log('✅ Password hash generated');

    // Update admin user
    const [result] = await connection.execute(
      `UPDATE admin_users 
       SET email = ?, password_hash = ? 
       WHERE id = '00000000-0000-0000-0000-000000000001' 
          OR email = 'admin@example.com' 
          OR email = 'admin@gmail.com'`,
      [newEmail, passwordHash]
    );

    if (result.affectedRows === 0) {
      // Insert if doesn't exist
      console.log('⚠️  No admin found, creating new one...');
      await connection.execute(
        `INSERT INTO admin_users (id, email, password_hash) 
         VALUES ('00000000-0000-0000-0000-000000000001', ?, ?)`,
        [newEmail, passwordHash]
      );
      console.log('✅ New admin created');
    } else {
      console.log(`✅ Admin updated (${result.affectedRows} row(s) affected)`);
    }

    // Verify the update
    const [admins] = await connection.execute(
      'SELECT email, password_hash FROM admin_users WHERE email = ?',
      [newEmail]
    );

    if (admins.length > 0) {
      const admin = admins[0];
      const isValid = await bcrypt.compare(newPassword, admin.password_hash);
      console.log(`\n✅ Verification:`);
      console.log(`   Email: ${admin.email}`);
      console.log(`   Password '${newPassword}' valid: ${isValid ? '✅ YES' : '❌ NO'}`);
    }

    await connection.end();
    console.log('\n✅ Admin credentials updated successfully!');
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

updateAdmin();

