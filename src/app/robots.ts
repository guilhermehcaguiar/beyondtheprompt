import type { MetadataRoute } from 'next';
import { origin } from '@/lib/origin';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: origin ? new URL('/sitemap.xml', origin).href : undefined,
  };
}
