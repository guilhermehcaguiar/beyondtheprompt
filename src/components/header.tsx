import Link from 'next/link';
import { Search } from 'lucide-react';
import { Brand } from './brand';
import { HeaderActions } from './header-actions';
import { MobileMenu } from './mobile-menu';
import { PrimaryNavigation } from './primary-navigation';

export function Header() {
  return (
    <header className="site-header">
      <div className="wrap header-inner">
        <Brand />
        <PrimaryNavigation />
        <div className="header-tools">
          <HeaderActions />
          <MobileMenu>
            <PrimaryNavigation mobile />
          </MobileMenu>
          <noscript>
            <Link className="icon-button" href="/glossario/" aria-label="Consultar glossário">
              <Search size={18} />
            </Link>
          </noscript>
        </div>
      </div>
    </header>
  );
}
