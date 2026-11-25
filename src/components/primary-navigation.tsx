'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { lessons, mainNavigation } from '@/content/site';

export function PrimaryNavigation({ mobile = false }: { mobile?: boolean }) {
  const pathname = usePathname();
  const currentPath = pathname.replace(/\/$/, '') || '/';
  const isLesson = lessons.some(({ slug }) => currentPath === `/${slug}`);
  const links = mobile
    ? [
        ...mainNavigation,
        { href: '/referencias/', label: 'Referências' },
        { href: '/sobre/', label: 'Sobre o projeto' },
      ]
    : mainNavigation;

  return (
    <nav className={mobile ? undefined : 'desktop-nav'} aria-label={mobile ? 'Menu móvel' : 'Principal'}>
      {links.map(({ href, label }) => {
        const current =
          href === '/#trilha'
            ? isLesson
              ? 'location'
              : undefined
            : href.replace(/\/$/, '') === currentPath
              ? 'page'
              : undefined;
        return (
          <Link key={href} href={href} prefetch={false} aria-current={current}>
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
