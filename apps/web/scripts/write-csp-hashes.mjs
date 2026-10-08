// Prerendered pages inline small scripts (React bootstrap and flight payloads).
// The site's CSP forbids 'unsafe-inline', so after the build we list exactly
// those scripts by SHA-256 hash in dist/csp-hashes.json, which src/proxy.ts
// reads at runtime. Per-request pages (/admin) use a nonce instead.
import { createHash } from 'node:crypto';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const root = 'dist';
const pages = join(root, 'server', 'app');

async function* htmlFiles(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) yield* htmlFiles(path);
    else if (entry.name.endsWith('.html')) yield path;
  }
}

const hashes = new Set();
const inlineScript = /<script(?![^>]*\ssrc=)[^>]*>([\s\S]*?)<\/script>/g;
for await (const file of htmlFiles(pages)) {
  for (const [, source] of (await readFile(file, 'utf8')).matchAll(
    inlineScript,
  )) {
    if (source?.trim())
      hashes.add(
        `'sha256-${createHash('sha256').update(source).digest('base64')}'`,
      );
  }
}

const file = join(root, 'csp-hashes.json');
await writeFile(file, JSON.stringify([...hashes].sort()));
console.log(`Allowed ${hashes.size} inline scripts by hash in ${file}`);
