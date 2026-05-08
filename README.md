# Zero One Group — Frontend Skill Test

> Login page prototype built with Next.js, TypeScript, React Hook Form, and Tailwind CSS.  
> Built on top of the [Zero One Group Monorepo](https://github.com/zero-one-group/monorepo) template.

---

## Live Demo

| Page | URL |
|------|-----|
| Dashboard | https://nextjs-login-page-test.vercel.app/ |
| Login | https://nextjs-login-page-test.vercel.app/login |

### Demo Credentials

| Field | Value |
|-------|-------|
| Email | `demo@example.com` |
| Password | `password123` |

> Any valid email format and any password will work — authentication is handled by [DummyJSON](https://dummyjson.com/docs/auth) mock API.

### Login Page

The login page features a split-panel layout matching the wireframe:

- **Left panel** — Dark teal hero section with branding headline and testimonial
- **Right panel** — Clean login form with Zero One Group logo, Google OAuth button, email/password fields, remember me, and forgot password

### Dashboard Page

Post-login dashboard with Zero One Group branding, navigation, and feature cards.

### Features

**Authentication**
- Login with email & password via DummyJSON mock API
- Client-side validation — required fields, email format check
- Inline error messages per field
- Server error handling (API failure, network error)
- Token stored in `localStorage` (Remember Me on) or `sessionStorage` (Remember Me off)
- Redirect to dashboard on successful login

**Form UX**
- Password show/hide toggle
- Submit button disabled + loading spinner while submitting
- "Continue with Google" button (UI prototype)
- "Forgot Password?" and "Create an account" links

**Design**
- Split-panel layout matching the wireframe (60% hero / 40% form)
- Responsive — hero panel hidden on mobile, form full-width
- Zero One Group brand colors (`#1a7a7a`)
- Custom ZOG logo

---

## Requirements Checklist

### Core Requirements

| Requirement | Status | Implementation |
|---|---|---|
| TypeScript + React 18+ | ✅ | React 19 + TypeScript via Next.js 16 |
| Next.js / Vite / Remix | ✅ | Next.js 16 with App Router |
| Tailwind CSS / UI Library | ✅ | Tailwind CSS v4 |
| React Hooks & State Management | ✅ | `useState` (server error, password toggle), `useForm` (RHF), `useRouter` |
| Third-party React library | ✅ | React Hook Form + Zod + @hookform/resolvers |
| AI usage in PROMPTS.md | ✅ | See [PROMPTS.md](./apps/nextjs-app/PROMPTS.md) |
| Monorepo template | ✅ | Built on [zero-one-group/monorepo](https://github.com/zero-one-group/monorepo) |
| Mock authentication | ✅ | [DummyJSON](https://dummyjson.com/docs/auth) — `POST /auth/login` |

### Bonus Points

| Bonus | Status | Implementation |
|---|---|---|
| Responsive / mobile friendly | ✅ | Hero panel hidden on mobile (`hidden lg:flex`) |
| Deploy to hosting platform | ✅ | Deployed to [Vercel](https://nextjs-login-page-test.vercel.app) |
| Unit tests | ✅ | 8 test cases with Vitest + @testing-library/react |
| E2E tests | ✅ | 7 test cases with Playwright |
| CI pipeline | ✅ | GitHub Actions — lint, typecheck, unit tests, build |
| Clear README | ✅ | This document |

---

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Form:** React Hook Form + Zod
- **Mock Auth:** DummyJSON
- **Unit Tests:** Vitest + @testing-library/react
- **E2E Tests:** Playwright
- **CI:** GitHub Actions

---

## Getting Started

### Prerequisites

- Node.js 22+
- pnpm 10+

### Installation

```bash
# Clone the repository
git clone https://github.com/rizqizulfian/nextjs-login-page-test.git
cd nextjs-login-page-test

# Install dependencies
pnpm install

# Start the development server
cd apps/nextjs-app
pnpm dev
```

App runs at [http://localhost:3000](http://localhost:3000).  
Login page at [http://localhost:3000/login](http://localhost:3000/login).

---

## Running Tests

### Unit Tests

```bash
cd apps/nextjs-app

pnpm test              # run all tests
pnpm test-coverage     # run with coverage report
pnpm test-ui           # interactive UI mode
```

### E2E Tests

```bash
cd apps/nextjs-app

pnpm e2e-install       # install browsers (first time only)
pnpm e2e               # run all E2E tests
pnpm e2e-chrome        # run on Chrome
pnpm e2e-mobile        # run on Mobile Chrome
```

---

## Project Structure

```
apps/nextjs-app/
├── public/
│   └── zog-logo.svg              # Zero One Group logo
├── src/
│   └── app/
│       ├── (auth)/
│       │   └── login/
│       │       ├── page.tsx      # Login page — split panel layout
│       │       └── form.tsx      # LoginForm — React Hook Form + Zod
│       ├── (dashboard)/
│       │   └── page.tsx          # Dashboard page (post-login)
│       ├── layout.tsx
│       └── link.tsx
├── tests/
│   └── pages/
│       └── login.test.tsx        # 8 unit tests (Vitest)
├── tests-e2e/
│   └── login.test.ts             # 7 E2E tests (Playwright)
├── PROMPTS.md                    # AI usage documentation
└── vercel.json                   # Vercel deployment config
```

---

## CI Pipeline

GitHub Actions workflow (`.github/workflows/ci.yml`) runs on every push/PR to `main`:

1. **Lint & Type Check** — `pnpm typecheck` + `pnpm lint`
2. **Unit Tests** — `pnpm test-coverage` (uploads coverage artifact)
3. **Build** — `pnpm build` (runs only after lint + tests pass)

---

## AI Usage

See [apps/nextjs-app/PROMPTS.md](./apps/nextjs-app/PROMPTS.md) for full documentation on how AI was used in this project.
