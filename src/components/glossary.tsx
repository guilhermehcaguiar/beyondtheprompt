'use client';

import Link from 'next/link';
import { useState } from 'react';
import { glossary } from '@/content/glossary';
import { lessons } from '@/content/site';
import { includesQuery } from '@/lib/search';

export function Glossary() {
  const [query, setQuery] = useState('');
  const matches = glossary.filter((term) =>
    includesQuery(query, `${term.term} ${term.definition} ${term.example ?? ''}`),
  );
  return (
    <div className="prose">
      <div className="field">
        <label htmlFor="glossary-search">Buscar no glossário</label>
        <input
          id="glossary-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Ex.: token, inferência ou viés"
        />
      </div>
      <p className="results-count" role="status">
        {matches.length} {matches.length === 1 ? 'termo encontrado' : 'termos encontrados'}
      </p>
      {matches.length ? (
        <dl className="glossary-list">
          {matches.map((term) => (
            <div key={term.id} id={term.id}>
              <dt>{term.term}</dt>
              <dd>
                {term.definition}
                {term.example && (
                  <p className="gloss-example">
                    <strong>Exemplo</strong> · {term.example}
                  </p>
                )}
                <Link href={`/${term.lesson}/`} className="text-link">
                  Lição · {lessons.find((lesson) => lesson.slug === term.lesson)?.title}
                </Link>
              </dd>
            </div>
          ))}
        </dl>
      ) : (
        <p className="empty-state">Nenhum termo encontrado. Tente abreviar ou usar outra palavra.</p>
      )}
    </div>
  );
}
