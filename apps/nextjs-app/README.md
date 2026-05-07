# Zero One Group — Frontend Skill Test

A login page prototype built with Next.js, TypeScript, React Hook Form, and Tailwind CSS as part of the Zero One Group frontend skill test.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Form Management:** React Hook Form + Zod
- **Mock Auth API:** [DummyJSON](https://dummyjson.com)
- **Unit Tests:** Vitest + @testing-library/react
- **E2E Tests:** Playwright
- **CI:** GitHub Actions

## Features

- Split-panel login layout (hero + form) matching the wireframe
- Client-side form validation with Zod schema
- Password visibility toggle
- "Remember Me" support (localStorage vs sessionStorage)
- Google OAuth button (UI prototype)
- Responsive design (hero panel hidden on mobile)
- Accessible form with proper ARIA labels

## Demo Credentials

The app uses [DummyJSON](https://dummyjson.com/docs/auth) as a mock auth provider. Any valid email format and any password will trigger a successful login.

## Prerequisites

- Node.js 22+
- pnpm 10+

## Getting Started

```bash
# Clone the repository
git clone https://github.com/rizqizulfian/nextjs-login-page-test.git
cd nextjs-login-page-test

# Install dependencies from workspace root
pnpm install

# Start the development server
cd apps/nextjs-app
pnpm dev
```

The app runs at [http://localhost:3000](http://localhost:3000).  
Navigate to [http://localhost:3000/login](http://localhost:3000/login) to see the login page.

## Running Tests

### Unit Tests

```bash
cd apps/nextjs-app

# Run all unit tests
pnpm test

# Run with coverage report
pnpm test-coverage

# Interactive UI mode
pnpm test-ui
```

### E2E Tests

```bash
cd apps/nextjs-app

# Install browsers (first time only)
pnpm e2e-install

# Run all E2E tests
pnpm e2e

# Run on specific browser
pnpm e2e-chrome
pnpm e2e-firefox
pnpm e2e-mobile
```

## Building for Production

```bash
cd apps/nextjs-app
pnpm build
pnpm start
```

## Deployment (Vercel)

1. Push the repo to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Set **Root Directory** to `apps/nextjs-app`
4. Set **Framework Preset** to Next.js
5. Deploy

## Project Structure

```
apps/nextjs-app/
├── public/
│   └── zog-logo.svg              # Zero One Group logo
├── src/
│   └── app/
│       ├── (auth)/
│       │   └── login/
│       │       ├── page.tsx      # Login page layout (split panel)
│       │       └── form.tsx      # LoginForm component (RHF + Zod)
│       ├── (dashboard)/
│       │   └── page.tsx          # Dashboard page (post-login)
│       ├── layout.tsx
│       └── link.tsx
├── tests/
│   └── pages/
│       └── login.test.tsx        # LoginForm unit tests (Vitest)
├── tests-e2e/
│   └── login.test.ts             # Login page E2E tests (Playwright)
├── PROMPTS.md                    # AI usage documentation
└── package.json
```

## CI Pipeline

The GitHub Actions workflow (`.github/workflows/ci.yml`) runs on every push/PR to `main`:

1. **Lint & Type Check** — `pnpm typecheck` + `pnpm lint`
2. **Unit Tests** — `pnpm test-coverage` (uploads coverage artifact)
3. **Build** — `pnpm build` (only runs after lint + tests pass)

## AI Usage

See [PROMPTS.md](./PROMPTS.md) for detailed documentation on how AI was used in this project.
