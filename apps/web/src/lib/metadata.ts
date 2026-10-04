import type { Metadata } from 'next';
import { siteName, siteOrigin, socialImage } from '@/content/site';

interface PageMetadataOptions {
  title: string;
  description: string;
  /** Route path with leading and trailing slash, e.g. `/products/`. */
  path: string;
  image?: string;
  article?: boolean;
  noindex?: boolean;
}

export function pageMetadata({
  title,
  description,
  path,
  image,
  article = false,
  noindex = false,
}: PageMetadataOptions): Metadata {
  const fullTitle = title === siteName ? title : `${title} | ${siteName}`;
  const canonical = siteOrigin ? `${siteOrigin}${path}` : undefined;
  const configuredSocial = image || socialImage;
  const socialUrl =
    configuredSocial && siteOrigin
      ? new URL(configuredSocial, siteOrigin).toString()
      : undefined;

  return {
    title: { absolute: fullTitle },
    description,
    ...(noindex && { robots: { index: false, follow: false } }),
    ...(canonical && { alternates: { canonical } }),
    openGraph: {
      type: article ? 'article' : 'website',
      siteName,
      title: fullTitle,
      description,
      ...(canonical && { url: canonical }),
      ...(socialUrl && { images: [socialUrl] }),
    },
    twitter: {
      card: socialUrl ? 'summary_large_image' : 'summary',
      title: fullTitle,
      description,
      ...(socialUrl && { images: [socialUrl] }),
    },
  };
}
