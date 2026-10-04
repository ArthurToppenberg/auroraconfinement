import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { marked } from 'marked';

export interface NewsPost {
  id: string;
  title: string;
  description: string;
  publishedDate: Date;
  updatedDate?: Date;
  html: string;
}

const newsDirectory = path.join(process.cwd(), 'src/content/news');

function parseDate(value: string, field: string, file: string): Date {
  const date = new Date(value);
  if (Number.isNaN(date.valueOf()))
    throw new Error(`${file}: "${field}" is not a valid date: ${value}`);
  return date;
}

// Front matter is a flat list of `key: value` lines; values may be quoted.
function parseFrontMatter(source: string, file: string) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(source);
  if (!match) throw new Error(`${file}: missing front matter`);
  const fields: Record<string, string> = {};
  for (const line of (match[1] ?? '').split(/\r?\n/)) {
    if (!line.trim()) continue;
    const pair = /^([A-Za-z]+):\s*(.*)$/.exec(line);
    if (!pair) throw new Error(`${file}: cannot parse front matter: ${line}`);
    fields[pair[1]!] = pair[2]!.trim().replace(/^(['"])(.*)\1$/, '$2');
  }
  return { fields, body: match[2] ?? '' };
}

function required(fields: Record<string, string>, key: string, file: string) {
  const value = fields[key];
  if (!value) throw new Error(`${file}: front matter requires "${key}"`);
  return value;
}

export async function getNewsPosts(): Promise<NewsPost[]> {
  const files = (await readdir(newsDirectory)).filter((file) =>
    /\.(md|mdx)$/.test(file),
  );
  const posts = await Promise.all(
    files.map(async (file): Promise<NewsPost> => {
      const { fields, body } = parseFrontMatter(
        await readFile(path.join(newsDirectory, file), 'utf8'),
        file,
      );
      const updated = fields['updatedDate'];
      return {
        id: file.replace(/\.(md|mdx)$/, ''),
        title: required(fields, 'title', file),
        description: required(fields, 'description', file),
        publishedDate: parseDate(
          required(fields, 'publishedDate', file),
          'publishedDate',
          file,
        ),
        ...(updated && {
          updatedDate: parseDate(updated, 'updatedDate', file),
        }),
        html: await marked.parse(body),
      };
    }),
  );
  return posts.sort(
    (a, b) => b.publishedDate.valueOf() - a.publishedDate.valueOf(),
  );
}

export const formatDate = (date: Date) =>
  new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'long',
    timeZone: 'UTC',
  }).format(date);
