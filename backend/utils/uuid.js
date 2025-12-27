// UUID generator utility for MySQL
// Since MySQL doesn't have a built-in UUID() function in all versions,
// we generate UUIDs in Node.js

const { randomUUID } = require('crypto');

function generateUUID() {
  return randomUUID();
}

module.exports = { generateUUID };

