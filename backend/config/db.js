const mysql = require('mysql2/promise');
require('dotenv').config();

// Parse DATABASE_URL or use individual connection parameters
let connectionConfig;

if (process.env.DATABASE_URL) {
  // Parse connection string (format: mysql://user:password@host:port/database)
  const url = new URL(process.env.DATABASE_URL);
  connectionConfig = {
    host: url.hostname,
    port: url.port || 3306,
    user: url.username,
    password: url.password,
    database: url.pathname.slice(1), // Remove leading '/'
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  };
} else {
  // Use individual environment variables
  connectionConfig = {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'portfolio_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  };
}

const pool = mysql.createPool(connectionConfig);

// Test connection (non-blocking)
pool.getConnection()
  .then(connection => {
    console.log('✅ MySQL database connected successfully');
    connection.release();
  })
  .catch(err => {
    console.error('❌ Database connection error:', err.message);
    console.error('❌ Full error:', err);
    console.error('💡 Check your .env file and ensure MySQL is running');
    // Don't exit - let the app start and show errors on API calls
  });

module.exports = pool;

