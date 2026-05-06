# Development notes

## Stack

- **Framework:** Next.js 16 (App Router)
- **UI:** React 19, Tailwind CSS 4, Framer Motion, Lottie
- **State:** Zustand
- **Quality:** ESLint (`eslint-config-next`), TypeScript

## First-time setup

```bash
npm install
npm run dev
```

## Conventions

- UI copy, commit messages, and branch names: English unless the team agrees otherwise.
- Follow `.cursor/rules/` when using AI assistants in this repo.
- Before changing Next.js APIs, skim `node_modules/next/dist/docs/` or the official docs — this major version may differ from older tutorials.

## Production run locally

```bash
npm run build
npm run start
```

## PM2 (optional)

If you use PM2, adjust `ecosystem.config.cjs` for your host and run `pm2 start ecosystem.config.cjs` after `npm run build`.
