// Database sync constants and utilities

const SYNC_OPTIONS = {
  force: false, // Set to true to drop and recreate tables (DANGER!)
  alter: false // Set to true to alter existing tables
};

const DB_TABLES = {
  ADMIN_USERS: 'admin_users',
  ABOUT_CONTENT: 'about_content',
  PROJECTS: 'projects',
  SKILLS: 'skills',
  EXPERIENCES: 'experiences',
  CONTACT_MESSAGES: 'contact_messages'
};

module.exports = {
  SYNC_OPTIONS,
  DB_TABLES
};

