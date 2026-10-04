// Minimal static file server for previewing and browser-testing the exported
// site in `dist/`. Resolves clean URLs and serves 404.html with a 404 status.
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize, resolve, sep } from 'node:path';

const root = resolve(process.argv[2] ?? 'dist');
const args = process.argv.slice(3);
const option = (name, fallback) => {
  const index = args.indexOf(name);
  return index === -1 ? fallback : args[index + 1];
};
const host = option('--host', '127.0.0.1');
const port = Number(option('--port', '4321'));

const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
};

// Apply the `/*` block of dist/_headers so previews enforce the real CSP.
async function loadGlobalHeaders() {
  let source;
  try {
    source = await readFile(join(root, '_headers'), 'utf8');
  } catch {
    return {};
  }
  const headers = {};
  let inGlobalBlock = false;
  for (const line of source.split('\n')) {
    if (!line.startsWith(' ') && line.trim())
      inGlobalBlock = line.trim() === '/*';
    else if (inGlobalBlock && line.includes(':')) {
      const index = line.indexOf(':');
      headers[line.slice(0, index).trim()] = line.slice(index + 1).trim();
    }
  }
  return headers;
}

const globalHeaders = await loadGlobalHeaders();

async function isFile(path) {
  try {
    return (await stat(path)).isFile();
  } catch {
    return false;
  }
}

async function resolveFile(pathname) {
  const clean = normalize(decodeURIComponent(pathname));
  const base = join(root, clean);
  if (base !== root && !base.startsWith(root + sep)) return null;
  for (const candidate of [base, join(base, 'index.html'), `${base}.html`]) {
    if (await isFile(candidate)) return candidate;
  }
  return null;
}

createServer(async (request, response) => {
  try {
    const { pathname } = new URL(request.url ?? '/', 'http://localhost');
    let file = await resolveFile(pathname);
    let status = 200;
    if (!file) {
      file = join(root, '404.html');
      status = 404;
    }
    const body = await readFile(file);
    response.writeHead(status, {
      ...globalHeaders,
      'Content-Type': types[extname(file)] ?? 'application/octet-stream',
    });
    response.end(request.method === 'HEAD' ? undefined : body);
  } catch {
    response.writeHead(500).end('Internal error');
  }
}).listen(port, host, () => {
  console.log(`Serving ${root} at http://${host}:${port}`);
});
