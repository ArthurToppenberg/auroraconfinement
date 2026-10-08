import { defineConfig } from 'prisma/config';

// Prisma 7 no longer loads .env itself; the repo-root .env holds DATABASE_URL.
try {
  process.loadEnvFile(new URL('../../.env', import.meta.url));
} catch {
  // No .env (e.g. CI or production): DATABASE_URL must come from the environment.
}

export default defineConfig({
  schema: 'prisma/schema.prisma',
  datasource: { url: process.env['DATABASE_URL'] ?? '' },
});
