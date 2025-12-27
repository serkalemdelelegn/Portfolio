const pool = require('../config/db');
const bcrypt = require('bcryptjs');

class Admin {
  static async findByEmail(email) {
    const [rows] = await pool.execute(
      'SELECT id, email, password_hash FROM admin_users WHERE email = ?',
      [email]
    );
    return rows[0];
  }

  static async findById(id) {
    const [rows] = await pool.execute(
      'SELECT id, email FROM admin_users WHERE id = ?',
      [id]
    );
    return rows[0];
  }

  static async verifyPassword(password, hash) {
    return bcrypt.compare(password, hash);
  }

  static async hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }
}

module.exports = Admin;

