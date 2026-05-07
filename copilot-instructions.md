# Portfolio Web Application - Copilot Instructions

## Project Overview

This is a **React + TypeScript + Vite** portfolio web application with an admin dashboard. The project showcases personal portfolio work with a public-facing site and a private admin panel for managing projects and content.

**Tech Stack:**
- **Frontend Framework:** React 19.2.4
- **Language:** TypeScript 6.0.2
- **Build Tool:** Vite 8.0.4
- **Styling:** Tailwind CSS 4.2.2
- **Routing:** React Router 7.14.0
- **HTTP Client:** Axios 1.15.0
- **Linting:** ESLint 9.39.4

## Project Structure

```
src/
├── api/                    # API integration layer
│   └── axios.ts           # Axios instance configuration and interceptors
├── app/                   # Application root
│   ├── App.tsx           # Main App component
│   └── globals.css       # Global styles
├── assets/               # Static assets (images, icons, etc.)
├── components/           # Reusable components
│   └── Navbar.tsx        # Navigation bar component
├── data/                 # Static data and mock data
│   ├── contact.ts        # Contact information
│   ├── index.ts          # Data exports
│   ├── project.ts        # Project list data
│   ├── resume.ts         # Resume/CV data
│   ├── tech.ts           # Technology stack data
│   └── user.ts           # User profile data
├── layouts/              # Layout components
│   ├── AdminLayout.tsx   # Admin dashboard layout
│   └── index.tsx         # Main layout (MainLayout)
├── pages/                # Page components
│   ├── about/            # About page
│   │   ├── index.tsx
│   │   ├── components/   # About-specific components
│   │   │   ├── AchievementList.tsx
│   │   │   ├── EducationGrid.tsx
│   │   │   ├── ExperienceTimeline.tsx
│   │   │   └── ProfileSection.tsx
│   │   └── hooks/
│   │       └── useAbout.ts     # About page custom hook
│   ├── admin/            # Admin pages
│   │   ├── dashboard/    # Admin dashboard
│   │   │   └── index.tsx
│   │   └── projects/     # Project management
│   │       ├── form.tsx  # Project form (create/edit)
│   │       └── index.tsx # Project list
│   ├── home/             # Home page
│   │   ├── index.tsx
│   │   ├── components/
│   │   │   ├── FeaturedProjects.tsx
│   │   │   └── HeroSection.tsx
│   │   └── hooks/
│   │       └── useHome.ts
│   ├── login/            # Admin login page
│   │   └── index.tsx
│   └── projects/         # Projects page
│       ├── detail.tsx    # Project detail page
│       ├── index.tsx     # Projects listing
│       ├── components/
│       │   └── ProjectCard.tsx
│       └── hooks/
│           ├── useProjectDetail.ts
│           └── useProjects.ts
│   └── index.tsx        # React Router setup
├── types/               # TypeScript type definitions
│   ├── achievementType.ts
│   ├── apiType.ts
│   ├── authType.ts
│   ├── contactType.ts
│   ├── index.ts         # Type exports
│   ├── projectType.ts
│   ├── resumeType.ts
│   ├── techType.ts
│   └── userType.ts
└── main.tsx            # Application entry point
```

## Route Configuration

### Public Routes (MainLayout)
- **`/`** - Home page (HeroSection, FeaturedProjects)
- **`/about`** - About page (ProfileSection, EducationGrid, ExperienceTimeline, AchievementList)
- **`/projects`** - Projects listing (ProjectCard components)
- **`/projects/:id`** - Individual project detail page

### Admin Routes (AdminLayout)
- **`/admin/login`** - Admin login page
- **`/admin`** - Admin dashboard
- **`/admin/projects`** - Projects management list
- **`/admin/projects/form`** - Project form (create/edit)

## API Integration

### Axios Setup (`src/api/axios.ts`)
- **Base URL:** `VITE_API_URL` environment variable (defaults to `http://localhost:8080/api/v1`)
- **Two instances:**
  - `publicApi` - For unauthenticated requests
  - `authApi` - For authenticated requests with 401 interceptor handling

### Authentication Flow
- Token stored in `localStorage`
- 401 responses redirect to `/admin/login`
- Remove token on unauthorized access

## Data Layer

All data is defined in `src/data/`:
- `user.ts` - User profile information
- `tech.ts` - Technology stack and skills
- `contact.ts` - Contact information
- `resume.ts` - Resume/CV data
- `project.ts` - Project listings
- `index.ts` - Re-exports all data modules

## Styling

- **Framework:** Tailwind CSS 4.2.2 with Vite plugin
- **Global styles:** `src/app/globals.css`
- Use Tailwind utility classes for component styling
- Custom CSS can be added to globals.css

## Custom Hooks Pattern

Hooks are organized by page/feature:
- `src/pages/home/hooks/useHome.ts` - Home page logic
- `src/pages/about/hooks/useAbout.ts` - About page logic
- `src/pages/projects/hooks/useProjects.ts` - Browse projects logic
- `src/pages/projects/hooks/useProjectDetail.ts` - Single project logic

## TypeScript Types

All types are centralized in `src/types/`:
- Import from `src/types` or specific type files
- All types are re-exported in `src/types/index.ts`
- API types in `apiType.ts` for endpoint responses
- Auth types in `authType.ts` for authentication

## Development Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run lint     # Run ESLint
npm run preview  # Preview production build
```

## Configuration Files

- **`vite.config.ts`** - Vite configuration with React and Tailwind plugins
- **`tsconfig.json`** - Main TypeScript configuration
- **`tsconfig.app.json`** - App-specific TypeScript settings
- **`tsconfig.node.json`** - Node/build tools TypeScript settings
- **`eslint.config.js`** - ESLint configuration
- **`vercel.json`** - Vercel deployment configuration

## Code Style & Conventions

1. **Component naming:** PascalCase (e.g., `HomePage.tsx`)
2. **Hook naming:** camelCase with "use" prefix (e.g., `useProjects.ts`)
3. **Exports:** Named exports preferred, default exports for pages/components
4. **Type definitions:** Separate files in `src/types/` directory
5. **API calls:** Use axios instances from `src/api/axios.ts`
6. **Styling:** Tailwind utility-first approach

## Common Tasks

### Adding a New Page
1. Create folder in `src/pages/`
2. Create `index.tsx` with page component
3. Add custom hook in `hooks/` subdirectory if needed
4. Add page-specific components in `components/` subdirectory
5. Add route to `src/router/index.tsx`
6. Define types in `src/types/` if needed

### Adding a New Component
1. Create `.tsx` file in `src/components/` or page's `components/` folder
2. Use TypeScript with proper typing
3. Style with Tailwind CSS classes
4. Export as named or default export

### Making API Calls
1. Use `publicApi` for unauthenticated requests
2. Use `authApi` for authenticated requests (with token handling)
3. Define response types in `src/types/apiType.ts`
4. Use custom hooks to encapsulate logic

### Adding Data
1. Define or update data in `src/data/`
2. Add TypeScript type in `src/types/`
3. Re-export from `src/data/index.ts`

## Environment Variables

Add to `.env` file:
```
VITE_API_URL=http://localhost:8080/api/v1
```

Note: Prefix must be `VITE_` to be accessible in Vite applications via `import.meta.env`
