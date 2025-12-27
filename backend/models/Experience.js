const pool = require('../config/db');
const { generateUUID } = require('../utils/uuid');

class Experience {
  static async findAll() {
    try {
      const [rows] = await pool.execute(
        `SELECT id, title, company, date_range, description, type
         FROM experiences
         ORDER BY display_order ASC, created_at DESC`
      );
      return rows;
    } catch (error) {
      console.error('Experience.findAll error:', error);
      throw error;
    }
  }

  static async findById(id) {
    const [rows] = await pool.execute(
      'SELECT * FROM experiences WHERE id = ?',
      [id]
    );
    return rows[0];
  }

  static async create(data, adminId) {
    const id = generateUUID();
    await pool.execute(
      `INSERT INTO experiences (id, title, company, date_range, description, type, created_by)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        data.title,
        data.company,
        data.date || data.dateRange,
        data.description || '',
        data.type || 'work',
        adminId
      ]
    );
    const [rows] = await pool.execute(
      'SELECT id, title, company, date_range, description, type FROM experiences WHERE id = ?',
      [id]
    );
    return rows[0];
  }

  static async update(id, data) {
    await pool.execute(
      `UPDATE experiences
       SET title = ?, company = ?, date_range = ?,
           description = ?, type = ?, updated_at = CURRENT_TIMESTAMP
       WHERE id = ?`,
      [
        data.title,
        data.company,
        data.date || data.dateRange,
        data.description || '',
        data.type || 'work',
        id
      ]
    );
    const [rows] = await pool.execute(
      'SELECT * FROM experiences WHERE id = ?',
      [id]
    );
    return rows[0];
  }

  static async delete(id) {
    await pool.execute(
      'DELETE FROM experiences WHERE id = ?',
      [id]
    );
    return { id };
  }
}

module.exports = Experience;

