# syntax=docker/dockerfile:1

FROM node:22-bookworm-slim AS base
RUN corepack enable && corepack prepare pnpm@10.4.1 --activate
WORKDIR /app

# ---- install + build (full monorepo context) ----
FROM base AS builder
COPY . .
RUN pnpm install --frozen-lockfile
# Build-time public values (read by server components while exporting).
ARG PUBLIC_SITE_URL
ARG PUBLIC_CONTACT_EMAIL
ARG PUBLIC_SOCIAL_IMAGE
# The Prisma client is generated source (gitignored); next build bundles it.
RUN pnpm --filter @aurora/db generate
RUN pnpm build
# Drop dev dependencies; the generated client and build output are kept.
RUN pnpm prune --prod

# ---- runtime ----
# `next start` serves the prerendered pages and renders /admin per request from
# the database. Runtime secrets (ADMIN_KODE, DATABASE_URL) come from the host's
# environment, never the image. dist/csp-hashes.json (written by `pnpm build`)
# supplies the script hashes that src/proxy.ts puts in the CSP.
FROM node:22-bookworm-slim AS runner
WORKDIR /app/apps/web
ENV NODE_ENV=production

RUN groupadd --system --gid 1001 nodejs \
 && useradd --system --uid 1001 --gid nodejs nextjs

COPY --from=builder --chown=nextjs:nodejs /app /app

USER nextjs
EXPOSE 3000

CMD ["node", "node_modules/next/dist/bin/next", "start", "--hostname", "0.0.0.0", "--port", "3000"]
