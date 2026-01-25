# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev           # Start development server
pnpm build         # TypeScript check and production build
pnpm preview       # Preview production build
pnpm lint          # Check linting and formatting
pnpm lint:fix      # Fix linting and formatting issues
pnpm format        # Format all files
pnpm test          # Run tests in watch mode
pnpm test:run      # Run tests once
pnpm test:coverage # Run tests with coverage
pnpm test:e2e      # Run E2E tests
pnpm test:e2e:ui   # Run E2E tests with UI mode
```

## Tech Stack

- **React 19** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS v4** for styling (using `@import "tailwindcss"` syntax)
- **TanStack React Query** for server state management
- **Jotai** for client state management
- **Axios** for HTTP requests
- **Biome** for linting and formatting
- **Commitlint** for commit message validation (conventional commits)
- **Lefthook** for git hooks (pre-commit: biome, commit-msg: commitlint)
- **Vitest** for unit testing with React Testing Library
- **Playwright** for E2E testing

## Architecture

- `src/main.tsx` - Application entry point with QueryClientProvider setup
- `src/App.tsx` - Root component
- `src/index.css` - Global styles with Tailwind import
- `src/test/setup.ts` - Vitest setup file
- `src/test/test-utils.tsx` - Custom render with providers
- `e2e/` - Playwright E2E test files

## Development Workflow (TDD)

This project follows Test-Driven Development. When implementing any feature:

1. **Write tests first** - Create test file with failing tests that describe the expected behavior
2. **Run tests** - Verify tests fail (`pnpm test:run`)
3. **Implement feature** - Write minimal code to make tests pass
4. **Refactor** - Clean up code while keeping tests green
5. **Verify** - Run `pnpm lint` and `pnpm build` before completion
6. **E2E testing** - Run `pnpm test:e2e` to verify feature works end-to-end

### Test file conventions

- Unit tests: `*.test.tsx` or `*.test.ts` (colocated with source)
- E2E tests: `e2e/*.spec.ts`
- Use `src/test/test-utils.tsx` for rendering components (includes QueryClientProvider)
