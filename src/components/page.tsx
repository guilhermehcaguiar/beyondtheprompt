import Link from 'next/link';
import type { ReactNode } from 'react';
import { ChevronRight } from 'lucide-react';

export function PageIntro({
  title,
  description,
  label,
  extra,
}: {
  title: string;
  description: string;
  label: string;
  extra?: ReactNode;
}) {
  return (
    <header className="page-intro" data-enter>
      <div className="wrap">
        <nav className="crumb" aria-label="Você está aqui">
          <Link href="/">Início</Link>
          <ChevronRight size={14} aria-hidden="true" />
          <span aria-current="page">{title}</span>
        </nav>
        <span className="eyebrow">{label}</span>
        <h1>{title}</h1>
        <p>{description}</p>
        {extra}
      </div>
    </header>
  );
}
