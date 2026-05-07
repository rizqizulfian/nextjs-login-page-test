# AI Usage & Prompts

This document describes how AI (Claude) was used throughout this project and the prompts that were provided.

---

## How AI Was Used

AI was used as a pair programmer throughout the development of this project. The workflow was:

1. **Architecture & Planning** — Described the task requirements to AI and asked it to create a step-by-step implementation plan.
2. **Code Generation** — AI generated the initial implementation for components, form logic, tests, and CI config.
3. **Code Review** — Asked AI to review generated code for bugs, accessibility issues, and best practices.
4. **Test Writing** — AI wrote comprehensive unit and E2E test suites based on component behavior.
5. **Documentation** — AI helped draft the README and this PROMPTS.md.

---

## Prompts Used

### 1. Initial Project Setup

```
I'm working on a Frontend skill test for Zero One Group. The task is to build a login page
using React + TypeScript that matches a given wireframe. The monorepo template is already
set up at apps/nextjs-app. Help me plan the full implementation including:
- Login page layout (split: hero left, form right)
- React Hook Form + Zod for form validation
- DummyJSON as the mock auth API
- Unit tests with Vitest
- E2E tests with Playwright
- GitHub Actions CI pipeline
- README documentation
```

### 2. Login Page Design

```
Design a login page that matches this wireframe:
- Left panel: dark teal background (#1a7a7a), centered heading "Your Trusted Digital
  Transformation Partner", testimonial quote at the bottom with avatar
- Right panel: white background, Zero One Group logo top-left, login form center,
  "Not Registered Yet? Create an account" link at bottom
- The form should have: Google OAuth button, email/password divider, email input,
  password input with show/hide toggle, remember me checkbox, forgot password link,
  login button
- Must be responsive (left panel hidden on mobile)
Use Tailwind CSS and TypeScript with Next.js App Router.
```

### 3. React Hook Form + Zod Integration

```
Implement the login form using:
- react-hook-form for form state management and submission
- zod for schema validation with these rules:
  - email: required, must be valid email format
  - password: required, min 1 character
  - rememberMe: optional boolean
- Show inline validation errors under each field
- Show password visibility toggle button
- On success: store token in localStorage (if rememberMe) or sessionStorage, then redirect to /
- On failure: show error alert above the form
- Use DummyJSON endpoint: POST https://dummyjson.com/auth/login with credentials
  { username: "emilys", password: "emilyspass" }
```

### 4. Unit Tests

```
Write comprehensive unit tests for the LoginForm component using Vitest and @testing-library/react.
Cover:
1. Renders all form elements correctly
2. Shows validation errors on empty submission
3. Shows error for invalid email format
4. Successful login calls the API and redirects
5. Failed API response shows error message
6. Network error shows error message
7. Password visibility toggle works
8. Submit button is disabled while submitting
9. Token stored in localStorage when Remember Me is checked
Mock next/navigation useRouter and global fetch.
```

### 5. E2E Tests

```
Write Playwright E2E tests for the login page at /login. Cover:
1. Page title is correct
2. All UI elements are visible
3. Empty form submission shows validation errors
4. Invalid email format shows error
5. Password visibility toggle works
6. Successful login (fill valid email + any password) redirects to /
7. Desktop: hero section is visible
8. Mobile (375px): hero section is hidden
```

### 6. GitHub Actions CI

```
Create a GitHub Actions CI workflow (.github/workflows/ci.yml) that:
- Triggers on push/PR to main branch, only when files in apps/nextjs-app/** or packages/**  change
- Has 3 jobs: lint-and-typecheck, unit-tests (with coverage upload), build
- Uses pnpm v10 and Node.js 22
- Installs deps from the workspace root with --frozen-lockfile
- Runs: pnpm typecheck, pnpm lint, pnpm test-coverage, pnpm build
- Uploads coverage report as an artifact (7 days retention)
- Build job only runs after lint and unit-tests pass
```

### 7. README Documentation

```
Write a clear README.md for the nextjs-app login page project. Include:
- Project overview and tech stack
- Prerequisites (Node.js, pnpm)
- Getting started (clone, install, dev server)
- Running tests (unit tests, E2E tests, coverage)
- Building for production
- Deployment to Vercel
- Project structure overview
- Demo credentials for the mock auth
```

---

## AI Tools Used

- **Claude (Anthropic)** — Primary AI assistant for code generation, architecture decisions, test writing, and documentation.

---

## Key AI-Assisted Decisions

| Decision | Reasoning |
|----------|-----------|
| React Hook Form over useActionState | Better DX, built-in validation integration with Zod, clear error handling |
| DummyJSON as mock API | Public, no setup required, returns realistic auth token responses |
| Zod schema validation | Type-safe, composable, integrates natively with React Hook Form via @hookform/resolvers |
| sessionStorage vs localStorage | Conditional based on "Remember Me" — respects user privacy intent |
| Split layout with CSS grid | Simple, responsive, matches wireframe exactly without extra dependencies |
