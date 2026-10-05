import type { Metadata } from 'next';
import Link from 'next/link';
import { pageMetadata } from '@/lib/metadata';
import { contactHrefs } from '@/content/site';

export const metadata: Metadata = pageMetadata({
  title: 'Page not found',
  description: 'The requested Aurora Confinement page could not be found.',
  path: '/404/',
  noindex: true,
});

export default function NotFound() {
  return (
    <section className="page-hero">
      <div className="shell page-hero-inner">
        <p className="eyebrow">404 · Page not found</p>
        <h1>This path is outside the field.</h1>
        <p className="lede">
          The page may have moved, or the address may be incomplete.
        </p>
        <div className="button-row">
          <a className="button primary" href="/">
            Return home
          </a>
          <Link className="button" href={contactHrefs.generalEnquiry}>
            Contact us
          </Link>
        </div>
      </div>
    </section>
  );
}
