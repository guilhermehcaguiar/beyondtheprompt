import Link from 'next/link';
import { Brand } from './brand';
import { lessons, resourceList, site } from '@/content/site';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <Brand />
            <p>{site.subtitle}</p>
          </div>
          <nav aria-label="Lições no rodapé">
            <h2>Aprender</h2>
            {lessons.map((item) => (
              <Link prefetch={false} key={item.slug} href={`/${item.slug}/`}>
                {item.title}
              </Link>
            ))}
          </nav>
          <nav aria-label="Recursos no rodapé">
            <h2>Explorar</h2>
            {resourceList.map((item) => (
              <Link prefetch={false} key={item.slug} href={`/${item.slug}/`}>
                {item.title}
              </Link>
            ))}
          </nav>
        </div>
        <div className="footer-note">
          <span>Projeto de extensão · Ciência da Computação</span>
          <Link href="/sobre/#privacidade" prefetch={false}>
            Privacidade
          </Link>
        </div>
      </div>
    </footer>
  );
}
