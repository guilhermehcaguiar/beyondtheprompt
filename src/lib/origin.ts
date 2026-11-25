import { site } from '@/content/site';

const productionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;
export const origin = site.url || (productionHost ? `https://${productionHost}` : '');
