const pool = require('../config/db');
const { generateUUID } = require('../utils/uuid');

class Project {
  static async findAll() {
    const [rows] = await pool.execute(
      `SELECT id, title, description, technologies, github_link, demo_link, image_url, display_order
       FROM projects
       ORDER BY display_order ASC, created_at DESC`
    );
    // Parse JSON technologies field
    return rows.map(row => ({
      ...row,
      technologies: typeof row.technologies === 'string' 
        ? JSON.parse(row.technologies) 
        : row.technologies || []
    }));
  }

  static async findById(id) {
    const [rows] = await pool.execute(
      'SELECT * FROM projects WHERE id = ?',
      [id]
    );
    if (rows[0]) {
      rows[0].technologies = typeof rows[0].technologies === 'string' 
        ? JSON.parse(rows[0].technologies) 
        : rows[0].technologies || [];
    }
    return rows[0];
  }

  static async create(data, adminId) {
    const id = generateUUID();
    await pool.execute(
      `INSERT INTO projects (id, title, description, technologies, github_link, demo_link, image_url, created_by)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        data.title,
        data.description,
        JSON.stringify(data.technologies || []),
        data.github || null,
        data.demo || null,
        data.image || null,
        adminId
      ]
    );
    const [rows] = await pool.execute(
      'SELECT id, title, description, technologies, github_link, demo_link, image_url FROM projects WHERE id = ?',
      [id]
    );
    if (rows[0]) {
      rows[0].technologies = typeof rows[0].technologies === 'string' 
        ? JSON.parse(rows[0].technologies) 
        : rows[0].technologies || [];
    }
    return rows[0];
  }

  static async update(id, data) {
    await pool.execute(
      `UPDATE projects
       SET title = ?, description = ?, technologies = ?,
           github_link = ?, demo_link = ?, image_url = ?,
           updated_at = CURRENT_TIMESTAMP
       WHERE id = ?`,
      [
        data.title,
        data.description,
        JSON.stringify(data.technologies || []),
        data.github || null,
        data.demo || null,
        data.image || null,
        id
      ]
    );
    const [rows] = await pool.execute(
      'SELECT * FROM projects WHERE id = ?',
      [id]
    );
    if (rows[0]) {
      rows[0].technologies = typeof rows[0].technologies === 'string' 
        ? JSON.parse(rows[0].technologies) 
        : rows[0].technologies || [];
    }
    return rows[0];
  }

  static async delete(id) {
    const [result] = await pool.execute(
      'DELETE FROM projects WHERE id = ?',
      [id]
    );
    return { id };
  }
}

module.exports = Project;

