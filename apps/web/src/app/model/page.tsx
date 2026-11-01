import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/metadata';
import PageHero from '@/components/PageHero';

export const metadata: Metadata = pageMetadata({
  title: 'Model',
  description: 'Model page for Aurora Confinement. Content coming soon.',
  path: '/model/',
  noindex: true,
});

export default function Page() {
  return <PageHero title="Model" compact />;
}
