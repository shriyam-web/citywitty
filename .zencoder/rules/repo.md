# Repository Guidelines

## Overview
- **Project Name**: CityWitty Web Platform
- **Purpose**: A Next.js 13 web application for showcasing merchants, managing user dashboards, and supporting partner workflows.
- **Primary Stack**: Next.js 13 (App Router), React 18, TypeScript, Tailwind CSS, NextAuth, Mongoose (MongoDB), and Radix UI components.

## Key Commands
1. **Install dependencies**: `npm install`
2. **Start development server**: `npm run dev`
3. **Run type check and build**: `npm run build`
4. **Start production server**: `npm run start`
5. **Lint the codebase**: `npm run lint`

## Project Structure Highlights
- **`app/`**: App Router pages, layouts, API routes, and providers.
- **`components/`**: Reusable UI components organized by domain (`layout`, `home`, `merchant`, `store`, `ui`).
- **`lib/`**: Shared utilities (MongoDB connection, auth context, helpers).
- **`models/`**: Mongoose schemas and interfaces for users, partners, admins, etc.
- **`hooks/`**: Custom React hooks.
- **`public/`**: Static assets (images, icons, banners).
- **`scripts/`**: Utilities such as merchant seeding scripts.

## Styling & UI
- **Tailwind CSS** is the default styling approach. Apply utility classes directly in JSX and avoid inline styles unless necessary.
- **Radix UI** components (wrapped in `components/ui`) ensure consistent design tokens.
- Prefer **Shadcn UI patterns** for new UI components where applicable.

## Authentication & Authorization
- **NextAuth** handles OAuth (Google) and manual credentials via custom API routes.
- User documents track the `provider` to ensure provider-specific flows.
- Session callbacks enrich `session.user` with `_id`, `role`, and `provider` values. Use these when gating dashboard routes.

## Database Guidelines
- The project connects to MongoDB via the shared `lib/mongodb.ts` helper. Always call `await dbConnect()` before interacting with models inside API routes or server actions.
- User IDs follow the convention `CW-U******` ("CW-U" + 6 uppercase hex chars). Reuse helper logic where necessary.

## Coding Conventions
- Use **TypeScript** for all application code. Avoid introducing `.jsx` or `.js` files for new components.
- Enable **strict typing** when possible. Define shared interfaces/types in dedicated files.
- Keep components small and composable. Prefer server components by default; opt in to `"use client"` only when you need browser-only APIs or hooks.

## Testing & Validation
- No automated test suite is currently configured. Add unit or integration tests with your preferred runner when feasible (Vitest or Jest are common choices).
- Rely on `npm run build` and `npm run lint` to catch regressions until dedicated tests exist.

## Environment & Secrets
- Required environment variables include:
  - **`MONGODB_URI`**: Connection string to MongoDB.
  - **`NEXTAUTH_SECRET`**: Secret key for NextAuth sessions.
  - **`GOOGLE_CLIENT_ID`** and **`GOOGLE_CLIENT_SECRET`**: OAuth credentials for Google login.
  - Additional keys are defined in `.env.local`; keep this file out of version control.
- Never commit secrets. Use environment management in your hosting provider when deploying.

## Deployment Notes
- The app assumes a Node.js environment compatible with Next.js 13.
- Run `npm run build` before deploying. Ensure environment variables are configured on the target platform.
- If using Vercel, confirm that MongoDB IP allowlist includes Vercel’s ranges or use MongoDB Atlas with Vercel integration.

## Contribution Tips
- Create feature branches for new work. Keep pull requests scoped and include context in descriptions.
- Run `npm run lint` and `npm run build` locally before opening a PR.
- Update documentation when adding significant features (README sections, inline comments, or this rules file).

Keeping this guide updated ensures future troubleshooting is faster and more accurate. Feel free to expand sections as the project evolves.