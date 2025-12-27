// Test database connection script
require('dotenv').config();
const mysql = require('mysql2/promise');

async function testConnection() {
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

  console.log('🔍 Testing database connection...');
  console.log('📋 Connection config:', {
    host: connectionConfig.host,
    port: connectionConfig.port,
    user: connectionConfig.user,
    database: connectionConfig.database,
    password: connectionConfig.password ? '***' : '(empty)'
  });

  try {
    // Test connection without database first
    const testConfig = { ...connectionConfig };
    delete testConfig.database;
    
    const connection = await mysql.createConnection(testConfig);
    console.log('✅ MySQL server connection successful');

    // Check if database exists
    const [databases] = await connection.execute(
      `SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = ?`,
      [connectionConfig.database]
    );

    if (databases.length === 0) {
      console.log(`❌ Database '${connectionConfig.database}' does not exist!`);
      console.log(`💡 Create it with: CREATE DATABASE ${connectionConfig.database};`);
      await connection.end();
      return;
    }

    console.log(`✅ Database '${connectionConfig.database}' exists`);

    // Test connection to the database
    await connection.end();
    const dbConnection = await mysql.createConnection(connectionConfig);
    console.log(`✅ Connected to database '${connectionConfig.database}'`);

    // Check if tables exist
    const [tables] = await dbConnection.execute(
      `SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = ?`,
      [connectionConfig.database]
    );

    console.log(`📊 Found ${tables.length} tables:`);
    tables.forEach(table => {
      console.log(`   - ${table.TABLE_NAME}`);
    });

    const requiredTables = ['admin_users', 'about_content', 'projects', 'skills', 'experiences', 'contact_messages'];
    const existingTables = tables.map(t => t.TABLE_NAME);
    const missingTables = requiredTables.filter(t => !existingTables.includes(t));

    if (missingTables.length > 0) {
      console.log(`\n❌ Missing tables: ${missingTables.join(', ')}`);
      console.log(`💡 Run the schema: mysql -u root -p ${connectionConfig.database} < scripts/init_schema.sql`);
    } else {
      console.log(`\n✅ All required tables exist!`);
    }

    await dbConnection.end();
    console.log('\n✅ Database connection test completed successfully!');
  } catch (error) {
    console.error('\n❌ Database connection failed!');
    console.error('Error:', error.message);
    console.error('\n💡 Common issues:');
    console.error('   1. MySQL server is not running');
    console.error('   2. Wrong database credentials in .env file');
    console.error('   3. Database does not exist');
    console.error('   4. Firewall blocking connection');
    process.exit(1);
  }
}

testConnection();

