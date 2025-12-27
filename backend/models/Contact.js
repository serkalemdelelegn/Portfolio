const pool = require('../config/db');
const { generateUUID } = require('../utils/uuid');

class Contact {
  static async findAll(unreadOnly = false) {
    let query = 'SELECT id, name, email, message, `read`, created_at FROM contact_messages';
    const params = [];
    
    if (unreadOnly) {
      query += ' WHERE `read` = ?';
      params.push(false);
    }
    
    query += ' ORDER BY created_at DESC';
    
    const [rows] = await pool.execute(query, params);
    return rows;
  }

  static async findById(id) {
    const [rows] = await pool.execute(
      'SELECT * FROM contact_messages WHERE id = ?',
      [id]
    );
    return rows[0];
  }

  static async create(data) {
    const id = generateUUID();
    await pool.execute(
      `INSERT INTO contact_messages (id, name, email, message)
       VALUES (?, ?, ?, ?)`,
      [id, data.name, data.email, data.message]
    );
    const [rows] = await pool.execute(
      'SELECT id, name, email, message, created_at FROM contact_messages WHERE id = ?',
      [id]
    );
    return rows[0];
  }

  static async markAsRead(id) {
    await pool.execute(
      'UPDATE contact_messages SET `read` = TRUE WHERE id = ?',
      [id]
    );
    const [rows] = await pool.execute(
      'SELECT * FROM contact_messages WHERE id = ?',
      [id]
    );
    return rows[0];
  }

  static async delete(id) {
    await pool.execute(
      'DELETE FROM contact_messages WHERE id = ?',
      [id]
    );
    return { id };
  }
}

module.exports = Contact;

