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
RUN pnpm build

# ---- runtime ----
# The site is a static export (apps/web/dist). It is served by the dependency-
# free scripts/serve-static.mjs, which also applies dist/_headers (the CSP,
# including the per-build inline-script hashes) as response headers.
FROM node:22-bookworm-slim AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN groupadd --system --gid 1001 nodejs \
 && useradd --system --uid 1001 --gid nodejs nextjs

COPY --from=builder --chown=nextjs:nodejs /app/apps/web/dist ./dist
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/scripts/serve-static.mjs ./serve-static.mjs

USER nextjs
EXPOSE 3000

CMD ["node", "serve-static.mjs", "dist", "--host", "0.0.0.0", "--port", "3000"]
