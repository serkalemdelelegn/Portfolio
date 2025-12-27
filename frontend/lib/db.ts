import { sql } from "@vercel/postgres"

export const db = {
  // Admin queries
  async getAdmin(email: string) {
    const result = await sql`
      SELECT id, email, password_hash FROM admin_users WHERE email = ${email}
    `
    return result.rows[0]
  },
  
  async updateSkill(id: string, data: any) {
    await sql`
      UPDATE skills
      SET name = ${data.name}, category = ${data.category}, level = ${data.level}, updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
    `
  },
  
  async updateExperience(id: string, data: any) {
    await sql`
      UPDATE experiences
      SET title = ${data.title}, company = ${data.company}, date_range = ${data.dateRange}, 
          description = ${data.description}, type = ${data.type}, updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
    `
  },

  // About content queries
  async getAbout() {
    const result = await sql`SELECT content FROM about_content ORDER BY updated_at DESC LIMIT 1`
    return result.rows[0]?.content || ""
  },

  async updateAbout(content: string, adminId: string) {
    await sql`INSERT INTO about_content (content, updated_by) VALUES (${content}, ${adminId})`
  },

  // Projects queries
  async getProjects() {
    const result = await sql`
      SELECT id, title, description, technologies, github_link, demo_link, image_url, display_order
      FROM projects
      ORDER BY display_order ASC, created_at DESC
    `
    return result.rows
  },

  async createProject(data: any, adminId: string) {
    const result = await sql`
      INSERT INTO projects (title, description, technologies, github_link, demo_link, created_by)
      VALUES (${data.title}, ${data.description}, ${data.technologies}, ${data.github}, ${data.demo}, ${adminId})
      RETURNING id, title, description, technologies
    `
    return result.rows[0]
  },

  async updateProject(id: string, data: any) {
    await sql`
      UPDATE projects
      SET title = ${data.title}, description = ${data.description}, technologies = ${data.technologies},
          github_link = ${data.github}, demo_link = ${data.demo}, updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
    `
  },

  async deleteProject(id: string) {
    await sql`DELETE FROM projects WHERE id = ${id}`
  },

  // Skills queries
  async getSkills(category?: string) {
    if (category) {
      const result = await sql`
        SELECT id, name, category, level
        FROM skills
        WHERE category = ${category}
        ORDER BY display_order ASC
      `
      return result.rows
    }

    const result = await sql`
      SELECT id, name, category, level
      FROM skills
      ORDER BY category ASC, display_order ASC
    `
    return result.rows
  },

  async createSkill(data: any, adminId: string) {
    const result = await sql`
      INSERT INTO skills (name, category, level, created_by)
      VALUES (${data.name}, ${data.category}, ${data.level}, ${adminId})
      RETURNING id, name, category, level
    `
    return result.rows[0]
  },

  async deleteSkill(id: string) {
    await sql`DELETE FROM skills WHERE id = ${id}`
  },

  // Experience queries
  async getExperiences() {
    const result = await sql`
      SELECT id, title, company, date_range, description, type
      FROM experiences
      ORDER BY display_order ASC, created_at DESC
    `
    return result.rows
  },

  async createExperience(data: any, adminId: string) {
    const result = await sql`
      INSERT INTO experiences (title, company, date_range, description, type, created_by)
      VALUES (${data.title}, ${data.company}, ${data.dateRange}, ${data.description}, ${data.type}, ${adminId})
      RETURNING id, title, company, date_range, description
    `
    return result.rows[0]
  },

  async deleteExperience(id: string) {
    await sql`DELETE FROM experiences WHERE id = ${id}`
  },

  // Contact messages queries
  async getContactMessages(unreadOnly = false) {
    if (unreadOnly) {
      const result = await sql`
        SELECT id, name, email, message, created_at
        FROM contact_messages
        WHERE read = FALSE
        ORDER BY created_at DESC
      `
      return result.rows
    }

    const result = await sql`
      SELECT id, name, email, message, read, created_at
      FROM contact_messages
      ORDER BY created_at DESC
    `
    return result.rows
  },

  async createContactMessage(data: any) {
    const result = await sql`
      INSERT INTO contact_messages (name, email, message)
      VALUES (${data.name}, ${data.email}, ${data.message})
      RETURNING id, name, email, message, created_at
    `
    return result.rows[0]
  },

  async markMessageAsRead(id: string) {
    await sql`UPDATE contact_messages SET read = TRUE WHERE id = ${id}`
  },
}
