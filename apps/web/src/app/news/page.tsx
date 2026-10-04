import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import { pageMetadata } from '@/lib/metadata';
import { formatDate, getNewsPosts } from '@/lib/news';

export const metadata: Metadata = pageMetadata({
  title: 'News',
  description:
    'Confirmed updates from the early-stage Aurora Confinement initiative.',
  path: '/news/',
});

export default async function NewsPage() {
  const posts = await getNewsPosts();
  return (
    <>
      <PageHero
        eyebrow="News"
        title="Project updates, when there is something real to share."
        intro="This section is reserved for confirmed progress, events, and announcements. It will not be filled with invented milestones."
        compact
      />
      <section className="section">
        <div className="shell news-list">
          {posts.map((post) => (
            <a className="news-card" href={`/news/${post.id}`} key={post.id}>
              <time dateTime={post.publishedDate.toISOString()}>
                {formatDate(post.publishedDate)}
              </time>
              <h2>{post.title}</h2>
              <p>{post.description}</p>
              <span className="text-link">Read update</span>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
