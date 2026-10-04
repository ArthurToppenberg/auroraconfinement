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
