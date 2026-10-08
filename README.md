# Aurora Confinement website

A mobile-first, static Next.js website for the student-led Aurora Confinement initiative. It deploys from `main` via CI, but the forms are in demonstration mode and do not transmit data.

## Requirements

- Node.js 22.18 or newer (needed for the built-in TypeScript test runner).
- pnpm 10.4.1 (`corepack enable` picks the pinned version from `package.json`).

## Structure

pnpm workspace managed with Turborepo, mirroring the Toppenberg & Niemann repository.

- `apps/web` — the Next.js site (static export to `apps/web/dist`), its tests, and `scripts/`
- `docs/` — project brief, deployment, form, and content notes
- `assets/` and the root logo files — approved originals, kept unchanged
- `Dockerfile`, `.dockerignore`, `.github/workflows/` — CI image build and deploy
- `pnpm-workspace.yaml` — workspace globs and the pinned `next`/`react` catalog

## Start locally

```sh
pnpm install
pnpm dev
```

Open `http://localhost:4321` in a browser. Stop the server with `Ctrl+C`.

`pnpm build` exports the site to `apps/web/dist`; `pnpm preview` serves that output (with the security headers applied) on the same port. `pnpm test:browser` runs against the preview server, so build first.

## Run checks

```sh
pnpm format:check
pnpm check
pnpm test
pnpm build
pnpm test:browser
```

Use `pnpm format` to apply the project formatting rules.

## Edit the homepage value proposition

Open `apps/web/src/content/site.ts`. The temporary homepage eyebrow, headline, supporting sentence, button labels, and destinations are grouped in the `homeHero` object.

## Add a news article

Create a Markdown file in `apps/web/src/content/news/` with a short lowercase filename such as `confirmed-event-update.md`:

```md
---
title: 'Confirmed update title'
description: 'A short factual summary.'
publishedDate: 2026-10-10
---

Write the approved article here.
```

The news index and article route are generated automatically. Publish only confirmed, approved facts.

## Replace images safely

The original supplied files in the project root and `assets/images/` are retained unchanged. Website copies live in `apps/web/public/images/`; the product illustrations are served as the pre-generated WebP sizes in `apps/web/public/images/concepts/`.

- Preserve the logo's proportions and transparency.
- Do not recolour, distort, crop through, or add heavy effects.
- Keep the exact visible concept disclaimer directly beneath every occurrence of either product illustration.
- Preserve the tabletop image's visible purple plasma and the research image's opaque enclosed vessel distinction.
- Update alternative text only when an approved replacement changes what is meaningfully shown.

A static export cannot resize images at request time, so the responsive WebP variants (360, 560, 760, 1080 and 1254 px wide) are committed under `apps/web/public/images/concepts/`. Regenerate them from the originals in `assets/images/` if an approved illustration changes.

## Form behaviour

The forms are deliberately unconfigured. They validate input in the browser, show accessible errors, return an honest failure state, and provide the confirmed contact email as an alternative. See `docs/FORM_CONFIGURATION.md` before connecting any service.

## Environment values

Copy `apps/web/.env.example` to `apps/web/.env` for local testing. In CI, the same values come from the repository variables `PUBLIC_SITE_URL` (`https://auroraconfinement.com`), `PUBLIC_CONTACT_EMAIL`, and `PUBLIC_SOCIAL_IMAGE`, passed to the Docker build. `.env` is ignored by Git. Public values configure the canonical site origin, approved contact email, and an optional separately approved social image.

## Dependency choices

- `next`, `react`, and `react-dom`: the requested framework and its required runtime. The site is exported as static files, so no Node server runs in production, but React ships to the browser to hydrate the menu and forms. Versions are pinned exactly.
- `marked`: renders the Markdown news articles at build time only; it is not shipped to the browser. Article content is authored in the repository and is not sanitised.
- `typescript`, `@types/react`, `@types/react-dom`, and `@types/node`: strict type checking.
- `@playwright/test` and `@axe-core/playwright`: local browser checks for responsive overflow, keyboard behaviour, forms, links, and accessibility. They add no code to the public site and make no third-party browser requests.
- `turbo`: runs workspace tasks (build, check, test) with caching.
- `prettier`: consistent formatting for TypeScript, CSS, Markdown, and configuration files.

These packages are build-time tools except the exported Next.js/React client bundle. They add no analytics, cookies, processors, remote fonts, or third-party browser requests. Keep them patched through reviewed lockfile updates and dependency scanning.

## Deployment

Every push to `main` runs `.github/workflows/build.yml` (builds the Docker image and pushes `ghcr.io/arthurtoppenberg/auroraconfinement:latest` and `:<git-sha>`), then `deploy.yml` SSHes to the server with a restricted key that can only run `/root/apps/aurora/bin/deploy.sh` (`docker compose pull && docker compose up -d`). The container serves the static export on port 3000 behind Caddy at `https://auroraconfinement.com`. See `docs/DEPLOYMENT.md` for setup, rollback, and verification.

## Before production

Read:

- `docs/MISSING_CONTENT.md` for every unresolved public fact and decision.
- `docs/FORM_CONFIGURATION.md` for the safe form-integration boundary.
- `docs/DEPLOYMENT.md` for preparation and rollback.

The team must still approve a domain, host, professional email, data controller, processor, retention policy, form endpoint, public team details, product claims, technical disclosures, and sharing image. Automated checks do not make the site legally compliant, fully accessible, secure in every deployment, or production-ready.

pnpm i && pnpm dev