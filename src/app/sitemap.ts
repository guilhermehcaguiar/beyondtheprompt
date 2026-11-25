import type { MetadataRoute } from 'next';
import { lessons, resourceList } from '@/content/site';
import { origin } from '@/lib/origin';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  if (!origin) return [];
  return ['/', ...[...lessons, ...resourceList].map(({ slug }) => `/${slug}/`)].map((path) => ({
    url: new URL(path, origin).href,
  }));
}
