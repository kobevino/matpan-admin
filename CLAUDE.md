# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev      # Start development server
pnpm build    # TypeScript check and production build
pnpm preview  # Preview production build
```

## Tech Stack

- **React 19** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS v4** for styling (using `@import "tailwindcss"` syntax)
- **TanStack React Query** for server state management
- **Jotai** for client state management
- **Axios** for HTTP requests

## Architecture

- `src/main.tsx` - Application entry point with QueryClientProvider setup
- `src/App.tsx` - Root component
- `src/index.css` - Global styles with Tailwind import
