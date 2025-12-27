# Serkalem's Portfolio CMS

A modern, responsive portfolio website with a full-featured admin dashboard for content management. Built with Next.js 16, Tailwind CSS, and a beautiful girlish color palette.

## Features

### Public Website
- **Hero Section** - Eye-catching introduction with call-to-action buttons
- **About Me** - Dynamic content managed from the admin panel
- **Projects** - Showcase of projects with technologies, GitHub links, and live demos
- **Skills** - Categorized skills (Frontend, Backend, Database, Tools)
- **Experience** - Timeline of work experience and achievements
- **Contact** - Contact form for visitors to reach out
- **Responsive Design** - Mobile-first design that works on all devices
- **Dark Mode** - Full dark mode support with persistent preference
- **Multilingual** - Full localization support for English and Amharic

### Admin Dashboard
- **Secure Authentication** - Email and password-based login
- **Content Management** - Manage About, Projects, Skills, and Experience
- **CRUD Operations** - Create, read, update, and delete functionality for all content types
- **Intuitive UI** - User-friendly interface for easy content management
- **Responsive** - Works great on desktop and tablet devices

## Design System

### Color Palette
- **Primary**: Soft pink (#FF69B4-inspired)
- **Secondary**: Soft purple (#DA70D6-inspired)
- **Accent**: Light pink (#FF85B5-inspired)
- **Neutrals**: White and light grays for light mode, dark grays for dark mode

### Typography
- **Heading Font**: Geist (sans-serif)
- **Body Font**: Geist (sans-serif)
- **Line Height**: 1.6 for optimal readability

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Authentication**: Custom JWT-based system
- **Database**: PostgreSQL (schema provided)
- **Deployment**: Vercel
- **Localization**: Custom i18n system

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- (Optional) PostgreSQL database

### Installation

1. Clone or download the project
2. Install dependencies:
```bash
npm install
```

3. Set up environment variables (if using database):
```env
DATABASE_URL=your_postgresql_url
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=password123
```

4. Initialize the database (optional):
```bash
npm run db:init
```

5. Start the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Admin Access

**Demo Credentials:**
- Email: `admin@example.com`
- Password: `password123`

Navigate to `/admin/login` to access the admin panel.

## File Structure

```
├── app/
│   ├── admin/          # Admin dashboard
│   ├── api/            # API routes
│   └── page.tsx        # Home page
├── components/
│   ├── admin/          # Admin components
│   ├── ui/             # shadcn/ui components
│   └── [other].tsx     # Page components
├── lib/
│   ├── i18n.ts         # Translation system
│   ├── language-context.tsx
│   ├── auth.ts         # Authentication utilities
│   └── db.ts           # Database operations
├── scripts/
│   └── init_schema.sql # Database initialization
└── styles/
    └── globals.css     # Global styles & design tokens

```

## Customization

### Change Color Scheme
Edit the CSS custom properties in `app/globals.css`:

```css
:root {
  --primary: oklch(0.65 0.25 330); /* Change to your color */
  /* ... other colors ... */
}
```

### Add New Content Types
1. Create a new table in the database schema
2. Add API routes in `app/api/`
3. Create admin pages in `app/admin/[type]/`
4. Add UI components as needed

### Update Content
All content can be managed from the admin dashboard at `/admin/dashboard`

## Localization

The portfolio supports multiple languages. Currently configured:
- English (en)
- Amharic (am)

To add a new language, update the `translations` object in `lib/i18n.ts`:

```typescript
export const translations = {
  en: { /* ... */ },
  am: { /* ... */ },
  fr: { /* ... */ }, // Add new language
}
```

## Database (Optional)

If you want to use a real database instead of in-memory storage:

1. Set up a PostgreSQL database
2. Run the initialization script: `scripts/init_schema.sql`
3. Update API routes to use the database client instead of in-memory storage
4. Update environment variables with your database URL

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy!

```bash
npm run build
npm run start
```

## Future Enhancements

- Database integration with PostgreSQL
- Email notifications for contact form submissions
- Image upload and optimization
- Blog section
- Analytics dashboard
- SEO optimization
- Performance monitoring
- Automated backups

## License

This portfolio template is free to use and modify for your own projects.

## Support

For questions or issues, please open an issue in the repository.

---

Built with ❤️ for Serkalem
