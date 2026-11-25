import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { test } from 'node:test';
import { articles } from '../src/content/articles.ts';
import { glossary } from '../src/content/glossary.ts';
import { experiments } from '../src/content/lab.ts';
import { references } from '../src/content/references.ts';
import { lessons, resourceList } from '../src/content/site.ts';
import { tools, toolSlug } from '../src/content/tools.ts';
import { promptExamples } from '../src/content/examples.ts';

const routes = ['/', ...[...lessons, ...resourceList].map(({ slug }) => `/${slug}/`)];
const pages = [...routes, '/404.html'];
const root = 'out';

function readPage(pathname: string) {
  const file = pathname.endsWith('.html') ? join(root, pathname) : join(root, pathname, 'index.html');
  return readFileSync(file, 'utf8');
}

test('páginas públicas, metadados e arquivos estáticos foram exportados', () => {
  for (const path of pages) {
    const html = readPage(path);
    assert.match(html, /<html lang="pt-BR"/u, path);
    assert.equal(Array.from(html.matchAll(/<h1(?: |>|\n)/g)).length, 1, path);
    assert.match(html, /<meta name="description" content="/u, path);
    assert.match(html, /<meta property="og:title" content="/u, path);
    assert.match(html, /<main id="conteudo"/u, path);
  }
  for (const asset of [
    'sitemap.xml',
    'robots.txt',
    'icon.svg',
    'social.png',
    'fonts/sora.woff2',
    'fonts/inter.woff2',
  ]) {
    assert.ok(existsSync(join(root, asset)), asset);
  }
  assert.ok(!existsSync(join(root, 'api')));
});

test('links internos publicados resolvem páginas e âncoras existentes', () => {
  for (const path of pages) {
    const html = readPage(path);
    const markup = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '');
    for (const match of markup.matchAll(/<a\b[^>]*?\bhref="([^"]+)"/g)) {
      const href = match[1].replaceAll('&amp;', '&');
      if (!href.startsWith('/') && !href.startsWith('#')) continue;
      const target = new URL(href, `https://test.invalid${path}`);
      assert.ok(pages.includes(target.pathname), `${path} → ${href}`);
      if (target.hash)
        assert.ok(
          readPage(target.pathname).includes(`id="${decodeURIComponent(target.hash.slice(1))}"`),
          `${path} → ${href}`,
        );
    }
  }
});

test('âncoras retornadas pela busca estão no HTML exportado', () => {
  const groups = {
    ...Object.fromEntries(
      lessons.map(({ slug }) => [slug, articles[slug].sections.map((section) => section.id)]),
    ),
    prompts: [
      ...articles.prompts.sections.map((section) => section.id),
      ...promptExamples.map((_, i) => `exemplo-${i + 1}`),
    ],
    laboratorio: experiments.map((experiment) => experiment.id),
    glossario: glossary.map((term) => term.id),
    ferramentas: tools.map((tool) => toolSlug(tool.name)),
    referencias: Object.keys(references),
  };
  for (const [slug, ids] of Object.entries(groups)) {
    const html = readPage(`/${slug}/`);
    for (const id of ids) assert.ok(html.includes(`id="${id}"`), `/${slug}/#${id}`);
  }
});
