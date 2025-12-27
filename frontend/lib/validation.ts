export const ValidationSchemas = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  url: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
  projectTitle: /^.{3,100}$/,
  skillName: /^.{2,50}$/,
}

export function validateEmail(email: string): boolean {
  return ValidationSchemas.email.test(email)
}

export function validateUrl(url: string): boolean {
  return ValidationSchemas.url.test(url)
}

export function validateProject(data: any): { valid: boolean; errors: string[] } {
  const errors: string[] = []

  if (!data.title || !ValidationSchemas.projectTitle.test(data.title)) {
    errors.push("Project title must be between 3 and 100 characters")
  }

  if (!data.description || data.description.length < 10) {
    errors.push("Project description must be at least 10 characters")
  }

  if (!Array.isArray(data.technologies) || data.technologies.length === 0) {
    errors.push("At least one technology is required")
  }

  return { valid: errors.length === 0, errors }
}

export function validateSkill(data: any): { valid: boolean; errors: string[] } {
  const errors: string[] = []
  const validCategories = ["frontend", "backend", "database", "tools"]
  const validLevels = ["beginner", "intermediate", "advanced"]

  if (!data.name || !ValidationSchemas.skillName.test(data.name)) {
    errors.push("Skill name must be between 2 and 50 characters")
  }

  if (!validCategories.includes(data.category)) {
    errors.push("Invalid skill category")
  }

  if (!validLevels.includes(data.level)) {
    errors.push("Invalid skill level")
  }

  return { valid: errors.length === 0, errors }
}
