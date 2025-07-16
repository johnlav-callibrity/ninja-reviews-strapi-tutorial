# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a full-stack "Ninja Reviews" application built with:
- **Backend**: Strapi v5.18.0 (TypeScript) - Content Management System and API
- **Frontend**: React 19.1.0 with TypeScript - User interface

The project follows a typical CMS + frontend architecture where Strapi serves as the headless CMS providing REST/GraphQL APIs, and React consumes these APIs to display content.

## Development Commands

### Backend (Strapi)
```bash
cd backend
npm run develop    # Start development server with auto-reload
npm run build      # Build admin panel
npm run start      # Start production server
npm run seed:example  # Seed database with example data
```

### Frontend (React)
```bash
cd frontend
npm start          # Start development server (localhost:3000)
npm run build      # Build for production
npm test           # Run tests
```

### Root Commands
```bash
# Install dependencies for both backend and frontend
npm install
```

## Content Types Architecture

### Core Content Types
- **Review**: Main review content (title, rating 1-10, blocks body)
- **Article**: Blog articles with dynamic content blocks
- **Category**: Content categorization (name, slug, description)
- **Author**: Content creators (name, avatar, email)
- **Global**: Site-wide settings and SEO
- **About**: About page content

### Content Relationships
- Articles belong to Categories (many-to-one)
- Articles belong to Authors (many-to-one)
- Categories have many Articles (one-to-many)
- Authors have many Articles (one-to-many)

### Dynamic Content Blocks
Articles use Strapi's dynamic zones with these shared components:
- `shared.media` - Image/video content
- `shared.quote` - Quote blocks
- `shared.rich-text` - Rich text content
- `shared.slider` - Image sliders

## Database and Seeding

- Uses better-sqlite3 for local development
- Seed data available in `backend/data/data.json`
- Images stored in `backend/data/uploads/` for seeding
- Run `npm run seed:example` to populate with sample content

## Key Directories

### Backend Structure
- `backend/src/api/` - API endpoints for each content type
- `backend/src/components/` - Reusable Strapi components
- `backend/config/` - Strapi configuration files
- `backend/scripts/` - Utility scripts (seeding, etc.)

### Frontend Structure
- `frontend/src/pages/` - Route components (HomePage, Category, ReviewDetails)
- `frontend/src/components/` - Reusable UI components
- Uses React Router DOM for client-side routing

## Development Workflow

1. Start backend: `cd backend && npm run develop`
2. Start frontend: `cd frontend && npm start`
3. Access Strapi admin at http://localhost:1337/admin
4. Access React app at http://localhost:3000

## API Permissions

The seed script configures public read permissions for:
- Articles (find, findOne)
- Categories (find, findOne)
- Authors (find, findOne)
- Global settings (find, findOne)
- About page (find, findOne)

## Testing

Frontend uses React Testing Library with Jest for testing components.