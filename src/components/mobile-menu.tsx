'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { Menu, X } from 'lucide-react';

export function MobileMenu({ children }: { children: ReactNode }) {
  const menu = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    function dismiss(event: PointerEvent) {
      const details = menu.current;
      if (details?.open && event.target instanceof Node && !details.contains(event.target)) {
        details.open = false;
      }
    }

    document.addEventListener('pointerdown', dismiss);
    return () => document.removeEventListener('pointerdown', dismiss);
  }, []);

  return (
    <details
      ref={menu}
      className="mobile-menu"
      onKeyDown={(event) => {
        if (event.key !== 'Escape' || !menu.current?.open) return;
        menu.current.open = false;
        menu.current.querySelector('summary')?.focus();
      }}
      onClick={(event) => {
        if (event.target instanceof Element && event.target.closest('a') && menu.current)
          menu.current.open = false;
      }}
    >
      <summary className="icon-button" aria-label="Menu">
        <Menu className="menu-open-icon" size={20} aria-hidden="true" />
        <X className="menu-close-icon" size={20} aria-hidden="true" />
      </summary>
      {children}
    </details>
  );
}
