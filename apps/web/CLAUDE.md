# CLAUDE.md — apps/web

Project rules live in the repo-root `AGENTS.md` (imported by the root `CLAUDE.md`).

Next.js 16 App Router with `output: 'export'` and `trailingSlash: true`; build output is
`dist/` (`distDir`). Next may differ from your training data — check
`node_modules/next/dist/docs/` before using unfamiliar APIs.

- Server components by default; `'use client'` only for `Header`, `InterestFormFields`, `PrintButton`.
- Build-time public values are read from `process.env.PUBLIC_*` in server code
  (`src/content/site.ts`); client components receive them as props.
- Global CSS only (`src/styles/global.css`); no inline styles (CSP).
