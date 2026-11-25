import type { Metadata } from 'next';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { site } from '@/content/site';
import { origin } from '@/lib/origin';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: origin ? new URL(origin) : undefined,
  title: { default: site.name, template: `%s | ${site.name}` },
  description: site.description,
  icons: { icon: '/icon.svg' },
  other: { 'page-type': 'software', 'site-kind': 'software' },
  alternates: origin ? { canonical: origin } : undefined,
  openGraph: {
    title: site.name,
    description: site.description,
    siteName: site.name,
    locale: 'pt_BR',
    type: 'website',
    images: origin ? [{ ...site.socialImage, alt: site.subtitle }] : undefined,
  },
};

const themeScript = `try {
  const theme = localStorage.getItem('btp:theme');
  if (theme === 'light' || theme === 'dark') document.documentElement.dataset.theme = theme;
} catch {}`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang={site.locale} data-type="software" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <a className="skip-link" href="#conteudo">
          Pular para o conteúdo
        </a>
        <Header />
        <main id="conteudo" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
