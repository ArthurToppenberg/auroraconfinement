import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/metadata';
import PageHero from '@/components/PageHero';

export const metadata: Metadata = pageMetadata({
  title: 'Research Platform',
  description:
    'Research Platform page for Aurora Confinement. Content coming soon.',
  path: '/research-platform/',
  noindex: true,
});

export default function Page() {
  return <PageHero title="Research Platform" compact />;
}
