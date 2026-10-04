// Next.js static export inlines small scripts (React bootstrap and flight
// payloads) into every page. The site's CSP forbids 'unsafe-inline', so after
// the build we allow exactly those scripts by SHA-256 hash in dist/_headers.
import { createHash } from 'node:crypto';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const root = 'dist';
const headersFile = join(root, '_headers');
const directive = "script-src 'self'";

async function* htmlFiles(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) yield* htmlFiles(path);
    else if (entry.name.endsWith('.html')) yield path;
  }
}

const hashes = new Set();
const inlineScript = /<script(?![^>]*\ssrc=)[^>]*>([\s\S]*?)<\/script>/g;
for await (const file of htmlFiles(root)) {
  for (const [, source] of (await readFile(file, 'utf8')).matchAll(
    inlineScript,
  )) {
    if (source?.trim())
      hashes.add(
        `'sha256-${createHash('sha256').update(source).digest('base64')}'`,
      );
  }
}

const headers = await readFile(headersFile, 'utf8');
if (!headers.includes(directive))
  throw new Error(`${headersFile} has no "${directive}" directive to extend`);
await writeFile(
  headersFile,
  headers.replace(directive, `${directive} ${[...hashes].sort().join(' ')}`),
);
console.log(`Allowed ${hashes.size} inline scripts by hash in ${headersFile}`);
