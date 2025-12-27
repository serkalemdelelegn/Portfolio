const pool = require('../config/db');
const { generateUUID } = require('../utils/uuid');

class About {
  static async getLatest() {
    const [rows] = await pool.execute(
      'SELECT content FROM about_content ORDER BY updated_at DESC LIMIT 1'
    );
    return rows[0]?.content || '';
  }

  static async create(content, adminId) {
    const id = generateUUID();
    await pool.execute(
      'INSERT INTO about_content (id, content, updated_by) VALUES (?, ?, ?)',
      [id, content, adminId]
    );
    const [rows] = await pool.execute(
      'SELECT * FROM about_content WHERE id = ?',
      [id]
    );
    return rows[0];
  }
}

module.exports = About;

