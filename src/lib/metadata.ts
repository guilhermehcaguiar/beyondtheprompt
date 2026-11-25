import type { Metadata } from 'next';
import { site } from '@/content/site';
import { origin } from '@/lib/origin';

export function pageMetadata(title: string, description: string, pathname: string): Metadata {
  const canonical = origin ? new URL(pathname, origin).href : undefined;
  return {
    title,
    description,
    alternates: canonical ? { canonical } : undefined,
    openGraph: {
      title: `${title} | ${site.name}`,
      description,
      siteName: site.name,
      locale: 'pt_BR',
      type: 'website',
      url: canonical,
      images: canonical ? [{ ...site.socialImage, alt: site.subtitle }] : undefined,
    },
  };
}
