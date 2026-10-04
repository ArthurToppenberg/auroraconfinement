# Deployment preparation and rollback

The production domain is `auroraconfinement.com`. The site is built into a Docker image by GitHub Actions and run as the stateless `aurora` container on the shared server, behind the Caddy reverse proxy (TLS via Let's Encrypt).

## Automated pipeline

1. A push to `main` runs `.github/workflows/build.yml`: `docker build` (the `Dockerfile` runs `pnpm install --frozen-lockfile` and `pnpm build`), then pushes `ghcr.io/arthurtoppenberg/auroraconfinement:latest` and `:<git-sha>`. Pull requests build but never push.
2. On success, `.github/workflows/deploy.yml` connects over SSH with the `VPS_DEPLOY_KEY` secret. The matching public key in the server's `authorized_keys` is pinned to `command="/root/apps/aurora/bin/deploy.sh",restrict`, so the key can do nothing else. The script pulls the image, recreates the container, and waits for it to be healthy.
3. The workflow then requests `https://auroraconfinement.com` as a smoke test.

Repository settings required: secret `VPS_DEPLOY_KEY`; variable `PUBLIC_SITE_URL=https://auroraconfinement.com`; optional variables `PUBLIC_CONTACT_EMAIL` and `PUBLIC_SOCIAL_IMAGE`. The GHCR package must be public (or the server logged in to GHCR), because the server pulls without credentials.

Server side (`~/apps/aurora`): `docker-compose.yml`, `bin/deploy.sh`, `.env` (`AURORA_TAG`). Caddy routes `auroraconfinement.com` to `aurora:3000`. To roll back, set `AURORA_TAG=<git-sha>` in `~/apps/aurora/.env` and run `docker compose up -d`; set it back to `latest` to resume tracking deploys. Manual redeploy: `cd ~/apps/aurora && bin/deploy.sh`.

The domain is proxied by Cloudflare. Keep its SSL/TLS mode on Full (strict); Flexible causes redirect loops against Caddy's HTTPS.

## Decisions required first

- Decide whether the host can serve the static site and a minimal same-origin form endpoint (the current container serves static files only).
- Approve the form/email processor, recipient, rate limiting, retention, and privacy terms.
- Complete content, IP, privacy, accessibility, and security review.

## Configuration

Copy `apps/web/.env.example` to an untracked `apps/web/.env` only for local testing. Set:

- `PUBLIC_SITE_URL` to the final HTTPS origin with no trailing slash. These values are read at build time by server components, so rebuild after changing them.
- `PUBLIC_CONTACT_EMAIL` to the approved public address.
- `PUBLIC_SOCIAL_IMAGE` only after a sharing image is separately approved and added.

Never store delivery credentials in a `PUBLIC_` variable. Client components cannot read these variables; pass values from a server component as props. A future server adapter must read secrets only from the host's secret store.

The `apps/web/public/_headers` file documents the intended restrictive headers. Confirm that the chosen host applies them; file-based header syntax is provider-dependent.

Next.js inlines small scripts into every exported page. `pnpm build` therefore rewrites `dist/_headers` so `script-src` also lists the SHA-256 hash of each inline script (`apps/web/scripts/write-csp-hashes.mjs`). The container serves the generated `dist/_headers` automatically (`scripts/serve-static.mjs`), not `public/_headers`; hashes change whenever the build output changes. If the host cannot serve file-based headers, the same CSP must be configured there with the hashes from the generated file.

## Release procedure

1. Install the pinned dependencies with `pnpm install --frozen-lockfile`.
2. Run `pnpm format:check`, `pnpm check`, `pnpm test`, and `pnpm build`.
3. Preview `apps/web/dist` with `pnpm preview` (a small local static server that applies the headers in `dist/_headers`) and repeat browser, keyboard, reduced-motion, accessibility, link, and external-request checks.
4. Test `/nff` and its QR code on multiple real phones.
5. Verify the production environment values and headers.
6. Merge to `main`; the pipeline above publishes the build.
7. Run a production smoke test without submitting personal data.

## Rollback

Set `AURORA_TAG=<previous-git-sha>` in `~/apps/aurora/.env` and run `docker compose up -d` from `~/apps/aurora`, then verify the home, contact, NFF, privacy, and accessibility routes. Do not roll back form code without also restoring its matching validation, privacy wording, and server configuration.
