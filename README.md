# AI Game Booster

Landing-style web app built with [Next.js](https://nextjs.org) (App Router), React 19, TypeScript, and Tailwind CSS v4. The home page is composed of marketing sections (hero, games, features, FAQ, and so on) under `app/`.

## Requirements

- Node.js 20+ (LTS recommended)
- npm (ships with Node)

## Scripts

| Command        | Description                    |
| -------------- | ------------------------------ |
| `npm run dev`  | Start dev server (hot reload)  |
| `npm run build`| Production build               |
| `npm run start`| Run production server          |
| `npm run lint` | ESLint                         |

After `npm run dev`, open [http://localhost:3000](http://localhost:3000).

## Environment

If you add API keys or other secrets later, use `.env.local` (not committed). Never paste secrets into the repo or chat; set variable names only in documentation.

## Project layout

- `app/` — routes, layout, and page-specific components
- `components/` — shared UI
- `lib/` — utilities
- `stores/` — client state (Zustand)
- `public/` — static assets
- `scripts/` — helper scripts
- `ecosystem.config.cjs` — optional PM2 process file

## Agents and Cursor rules

This repository includes Cursor rules under `.cursor/rules/` (orchestration, frontend/backend conventions). See `AGENTS.md` for a note about the Next.js major version in use.

## Deploy

You can deploy on [Vercel](https://vercel.com/new) or any Node host that supports Next.js. See the [Next.js deployment docs](https://nextjs.org/docs/app/building-your-application/deploying).

## License

Private project (`"private": true` in `package.json`). Add a license file if you intend to open-source it.
