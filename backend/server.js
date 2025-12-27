const app = require('./app');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🌐 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:3000'}`);
});

// Handle port already in use error
server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`❌ Port ${PORT} is already in use.`);
    console.log(`💡 To find and kill the process, run:`);
    console.log(`   netstat -ano | findstr :${PORT}`);
    console.log(`   taskkill /PID <PID> /F`);
    console.log(`\n   Or change the PORT in your .env file`);
    process.exit(1);
  } else {
    throw err;
  }
});

