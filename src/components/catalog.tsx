'use client';

import { useState } from 'react';
import { toolCategories, tools, toolSlug } from '@/content/tools';
import { includesQuery } from '@/lib/search';
import { Select } from './select';

export function Catalog() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const matches = tools.filter(
    (tool) =>
      (!category || tool.category === category) &&
      includesQuery(query, `${tool.name} ${tool.category} ${tool.description} ${tool.applications}`),
  );
  return (
    <>
      <div className="filters">
        <div className="field">
          <label htmlFor="tool-search">Buscar ferramentas</label>
          <input
            id="tool-search"
            type="search"
            placeholder="Ex.: pesquisa ou programação"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="tool-category">Finalidade</label>
          <Select id="tool-category" value={category} onChange={(event) => setCategory(event.target.value)}>
            <option value="">Todas as categorias</option>
            {toolCategories.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </Select>
        </div>
      </div>
      <p className="results-count" role="status">
        {matches.length} {matches.length === 1 ? 'ferramenta encontrada' : 'ferramentas encontradas'}
      </p>
      {matches.length ? (
        <div className="catalog-grid">
          {matches.map((tool) => (
            <article className="panel" key={tool.name} id={toolSlug(tool.name)}>
              <span className="eyebrow">{tool.category}</span>
              <h2>{tool.name}</h2>
              <p>{tool.description}</p>
              <p>
                <strong>Aplicações</strong> · {tool.applications}
              </p>
              <p>
                <strong>Limitação</strong> · {tool.limitation}
              </p>
              <p>
                <strong>Como usar</strong> · {tool.guidance}
              </p>
              <a className="text-link" href={tool.url}>
                Site oficial · {tool.name}
              </a>
            </article>
          ))}
        </div>
      ) : (
        <p className="empty-state">Nenhuma ferramenta para essa combinação de busca e categoria.</p>
      )}
    </>
  );
}
