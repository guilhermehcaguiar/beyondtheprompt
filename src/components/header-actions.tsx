'use client';

import { useEffect, useEffectEvent, useRef, useState } from 'react';
import Link from 'next/link';
import { Moon, Search, Sun, Monitor, X } from 'lucide-react';
import { writeLocal } from '@/lib/local';
import { includesQuery, normalize } from '@/lib/search';
import type { SearchItem } from '@/content/search-index';

export function HeaderActions() {
  const dialog = useRef<HTMLDialogElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const [themeLabel, setThemeLabel] = useState('');
  const [items, setItems] = useState<SearchItem[]>();
  const [query, setQuery] = useState('');
  const [loadError, setLoadError] = useState(false);

  function cycleTheme() {
    const root = document.documentElement;
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const themes = systemDark ? ['light', 'dark'] : ['dark', 'light'];
    const theme = themes[themes.indexOf(root.dataset.theme ?? '') + 1];
    if (theme) root.dataset.theme = theme;
    else delete root.dataset.theme;
    writeLocal('btp:theme', theme ?? null);
    setThemeLabel(theme === 'dark' ? 'Tema escuro' : theme === 'light' ? 'Tema claro' : 'Tema do sistema');
  }

  async function showSearch() {
    if (!dialog.current || dialog.current.open) return;
    dialog.current.showModal();
    input.current?.focus();
    if (items) return;
    setLoadError(false);
    try {
      setItems((await import('@/content/search-index')).searchIndex);
    } catch {
      setLoadError(true);
    }
  }

  const openWithShortcut = useEffectEvent(() => {
    void showSearch();
  });

  useEffect(() => {
    function handleShortcut(event: KeyboardEvent) {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        if (!event.repeat) openWithShortcut();
      }
    }

    document.addEventListener('keydown', handleShortcut);
    return () => document.removeEventListener('keydown', handleShortcut);
  }, []);

  const term = normalize(query);
  const results = (items ?? [])
    .filter((item) => includesQuery(term, `${item.title} ${item.description} ${item.keywords ?? ''}`))
    .map((item) => ({
      ...item,
      rank: normalize(item.title) === term ? 0 : includesQuery(term, item.title) ? 1 : 2,
    }))
    .sort((a, b) => a.rank - b.rank);
  const displayed = term ? results : results.slice(0, 8);

  return (
    <>
      <button
        type="button"
        className="icon-button search-trigger"
        onClick={showSearch}
        aria-label="Buscar no site"
        aria-keyshortcuts="Control+K Meta+K"
        aria-haspopup="dialog"
      >
        <Search size={19} aria-hidden="true" />
        <span className="search-label" aria-hidden="true">
          Buscar
        </span>
      </button>
      <button
        type="button"
        className="icon-button theme-button"
        onClick={cycleTheme}
        aria-label="Alternar tema"
        title="Alternar entre claro, escuro e sistema"
      >
        <Sun className="to-light" size={19} />
        <Moon className="to-dark" size={19} />
        <Monitor className="to-system" size={19} />
      </button>
      <span className="sr-only" role="status">
        {themeLabel}
      </span>
      <dialog
        ref={dialog}
        aria-labelledby="search-title"
        onKeyDown={(event) => {
          if (event.key !== 'Escape') return;
          event.preventDefault();
          event.currentTarget.close();
        }}
      >
        <header className="dialog-head">
          <h2 id="search-title">Buscar no site</h2>
          <button
            type="button"
            className="icon-button"
            onClick={() => dialog.current?.close()}
            aria-label="Fechar busca"
          >
            <X size={20} />
          </button>
        </header>
        <div className="field">
          <label htmlFor="site-query">Conteúdo ou expressão</label>
          <input
            ref={input}
            id="site-query"
            type="search"
            placeholder="Ex.: redes neurais"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
        <p role="status">
          {loadError
            ? 'A busca não carregou. Feche e abra novamente.'
            : !items
              ? 'Carregando índice…'
              : term
                ? `${results.length} ${results.length === 1 ? 'resultado' : 'resultados'}`
                : 'Sugestões para começar'}
        </p>
        {items && results.length === 0 && (
          <p>
            Tente outro termo ou consulte o{' '}
            <Link className="text-link" href="/glossario/" onClick={() => dialog.current?.close()}>
              glossário
            </Link>
            .
          </p>
        )}
        <ul className="result-list">
          {displayed.map((hit) => (
            <li key={hit.href}>
              <Link href={hit.href} prefetch={false} onClick={() => dialog.current?.close()}>
                {hit.title}
                <small>{hit.description}</small>
              </Link>
            </li>
          ))}
        </ul>
      </dialog>
    </>
  );
}
