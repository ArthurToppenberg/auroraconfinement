# CLAUDE.md — Aurora Confinement website

@AGENTS.md

Repo layout and day-to-day commands (pnpm + Turborepo, mirrors ToppenbergAndNiemann):

- `apps/web` — the Next.js site (App Router, static export to `apps/web/dist`).
  Run package scripts from the repo root (`pnpm dev|build|check|test|test:browser|format:check`).
- `docs/` — project brief and operational notes. Read `docs/PROJECT_BRIEF.md` first.
- `Dockerfile`, `.github/workflows/{build,deploy}.yml` — CI image build and deploy.

## Deployment (CI-only)

Push to `main` → `build.yml` pushes `ghcr.io/arthurtoppenberg/auroraconfinement` →
`deploy.yml` SSHes to the server with a deploy key pinned to
`/root/apps/aurora/bin/deploy.sh`. Serves `https://auroraconfinement.com` via Caddy.
The container serves the static export with `apps/web/scripts/serve-static.mjs`, which
applies `dist/_headers` (CSP with per-build script hashes). Details: `docs/DEPLOYMENT.md`.

- Don't commit, push, or change repo secrets/variables unless asked.
- Never reboot the server; ask first.
- Keep the UI as-is unless the task is explicitly about design.
- Don't start dev servers (`pnpm dev`, `next dev`). Assume the human dev already has one
  running; if you need one and none is up, tell the human to start it.

## UI work

For any UI you build or change, use the `/design-taste-frontend` skill. For a single
section or component, skip its direction draw: match the surrounding design, apply its
house rules, and run `inspect.mjs` on the production build (`pnpm build`). Its rules
apply alongside `AGENTS.md`; where they conflict (for example the logo, concept-image
captions, CSP, or the no-inline-styles rule), `AGENTS.md` wins.
