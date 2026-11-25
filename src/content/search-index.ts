import { articles } from './articles';
import { glossary } from './glossary';
import { experiments } from './lab';
import { lessons, resourceList } from './site';
import { tools, toolSlug } from './tools';
import { promptExamples } from './examples';
import { references } from './references';

export type SearchItem = { href: string; title: string; description: string; keywords?: string };

export const searchIndex: SearchItem[] = [
  ...[...lessons, ...resourceList].map(({ slug, title, description }) => ({
    href: `/${slug}/`,
    title,
    description,
  })),
  ...lessons.flatMap(({ slug, short }) =>
    articles[slug].sections.map((section) => ({
      href: `/${slug}/#${section.id}`,
      title: section.title,
      description: short,
      keywords: [...section.paragraphs, section.example].filter(Boolean).join(' '),
    })),
  ),
  ...experiments.map(({ id, title, description }) => ({ href: `/laboratorio/#${id}`, title, description })),
  ...glossary.map(({ id, term, definition, example }) => ({
    href: `/glossario/#${id}`,
    title: term,
    description: definition,
    keywords: example,
  })),
  ...promptExamples.map(({ title, prompt }, index) => ({
    href: `/prompts/#exemplo-${index + 1}`,
    title: `Prompt de ${title.toLocaleLowerCase('pt-BR')}`,
    description: prompt,
  })),
  ...tools.map((tool) => ({
    href: `/ferramentas/#${toolSlug(tool.name)}`,
    title: tool.name,
    description: tool.description,
    keywords: `${tool.category} ${tool.applications}`,
  })),
  ...Object.entries(references).map(([id, source]) => ({
    href: `/referencias/#${id}`,
    title: source.title,
    description: source.note,
    keywords: source.author,
  })),
];
