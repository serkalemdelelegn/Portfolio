const pool = require('../config/db');
const { generateUUID } = require('../utils/uuid');

class Skill {
  static async findAll(category = null) {
    let query = 'SELECT id, name, category, level FROM skills';
    const params = [];
    
    if (category) {
      query += ' WHERE category = ?';
      params.push(category);
    }
    
    query += ' ORDER BY category ASC, display_order ASC';
    
    const [rows] = await pool.execute(query, params);
    return rows;
  }

  static async findById(id) {
    const [rows] = await pool.execute(
      'SELECT * FROM skills WHERE id = ?',
      [id]
    );
    return rows[0];
  }

  static async create(data, adminId) {
    const id = generateUUID();
    await pool.execute(
      `INSERT INTO skills (id, name, category, level, created_by)
       VALUES (?, ?, ?, ?, ?)`,
      [id, data.name, data.category, data.level, adminId]
    );
    const [rows] = await pool.execute(
      'SELECT id, name, category, level FROM skills WHERE id = ?',
      [id]
    );
    return rows[0];
  }

  static async update(id, data) {
    await pool.execute(
      `UPDATE skills
       SET name = ?, category = ?, level = ?, updated_at = CURRENT_TIMESTAMP
       WHERE id = ?`,
      [data.name, data.category, data.level, id]
    );
    const [rows] = await pool.execute(
      'SELECT * FROM skills WHERE id = ?',
      [id]
    );
    return rows[0];
  }

  static async delete(id) {
    await pool.execute(
      'DELETE FROM skills WHERE id = ?',
      [id]
    );
    return { id };
  }
}

module.exports = Skill;

