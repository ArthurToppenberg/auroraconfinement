import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { formatDate, getNewsPosts } from '@/lib/news';
import { pageMetadata } from '@/lib/metadata';

interface NewsPostPageProps {
  params: Promise<{ id: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getNewsPosts()).map((post) => ({ id: post.id }));
}

async function findPost(params: NewsPostPageProps['params']) {
  const { id } = await params;
  return (await getNewsPosts()).find((post) => post.id === id);
}

export async function generateMetadata({
  params,
}: NewsPostPageProps): Promise<Metadata> {
  const post = await findPost(params);
  if (!post) return {};
  return pageMetadata({
    title: post.title,
    description: post.description,
    path: `/news/${post.id}/`,
    article: true,
  });
}

export default async function NewsPostPage({ params }: NewsPostPageProps) {
  const post = await findPost(params);
  if (!post) notFound();
  const { title, description, publishedDate, updatedDate, html } = post;

  return (
    <article className="article shell-narrow">
      <header className="article-header">
        <a className="back-link" href="/news">
          Back to news
        </a>
        <p className="eyebrow">Project update</p>
        <h1>{title}</h1>
        <p className="lede">{description}</p>
        <p className="article-date">
          Published{' '}
          <time dateTime={publishedDate.toISOString()}>
            {formatDate(publishedDate)}
          </time>
          {updatedDate && (
            <>
              {' '}
              · Updated{' '}
              <time dateTime={updatedDate.toISOString()}>
                {formatDate(updatedDate)}
              </time>
            </>
          )}
        </p>
      </header>
      {/* Markdown is authored in-repo (src/content/news), never user input. */}
      <div className="prose" dangerouslySetInnerHTML={{ __html: html }} />
    </article>
  );
}
