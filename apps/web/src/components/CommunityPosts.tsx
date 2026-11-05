const posts = [
  {
    id: '7520749011922743296',
    height: 567,
    title:
      'LinkedIn post about Nordic Fusion Forum and the fusion lunch lecture',
    original:
      'https://www.linkedin.com/posts/nordic-fusion-forum-2026-and-lunch-lecture-ugcPost-7520749011922743296-R62n/',
  },
  {
    id: '7520813389590372352',
    height: 628,
    title: 'Second supplied LinkedIn post from the fusion community',
    original:
      'https://www.linkedin.com/feed/update/urn:li:ugcPost:7520813389590372352/',
  },
  {
    id: '7518619532371083264',
    height: 628,
    title: 'Third supplied LinkedIn post from the fusion community',
    original:
      'https://www.linkedin.com/feed/update/urn:li:ugcPost:7518619532371083264/',
  },
] as const;

export default function CommunityPosts() {
  return (
    <section
      className="section field-deep team-community"
      aria-labelledby="community-posts-heading"
    >
      <div className="shell">
        <div className="section-heading">
          <h2 id="community-posts-heading">Seen in the fusion community:</h2>
        </div>
        <ul className="community-posts">
          {posts.map((post) => (
            <li className="community-post" key={post.id}>
              <iframe
                src={`https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:${post.id}?collapsed=1`}
                title={post.title}
                width="504"
                height={post.height}
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <a
                className="community-post-original"
                href={post.original}
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  aria-hidden="true"
                  focusable="false"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M20.45 2H3.55C2.69 2 2 2.68 2 3.52v16.96c0 .84.69 1.52 1.55 1.52h16.9c.86 0 1.55-.68 1.55-1.52V3.52c0-.84-.69-1.52-1.55-1.52ZM7.93 18.75H4.98V9.2h2.95v9.55ZM6.45 7.9a1.71 1.71 0 1 1 0-3.42 1.71 1.71 0 0 1 0 3.42Zm12.3 10.85H15.8V14.1c0-1.11-.02-2.54-1.55-2.54-1.55 0-1.79 1.21-1.79 2.46v4.73H9.51V9.2h2.83v1.3h.04c.4-.75 1.36-1.55 2.79-1.55 2.98 0 3.58 1.96 3.58 4.51v5.29Z" />
                </svg>
                View original post
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
