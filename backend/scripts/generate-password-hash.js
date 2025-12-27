// Script to generate bcrypt hash for passwords
const bcrypt = require('bcryptjs');

async function generateHash(password) {
  const hash = await bcrypt.hash(password, 10);
  console.log(`Password: ${password}`);
  console.log(`Hash: ${hash}`);
  return hash;
}

const password = process.argv[2] || 'serk1234';
generateHash(password).then(hash => {
  console.log('\nUse this hash in your database:');
  console.log(hash);
});

