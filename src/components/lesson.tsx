import Link from 'next/link';
import { Clock } from 'lucide-react';
import { articles } from '@/content/articles';
import { codeExamples, promptExamples } from '@/content/examples';
import { references } from '@/content/references';
import { lessons, type LessonSlug } from '@/content/site';
import { CopyButton } from './copy-button';
import { PageIntro } from './page';
import { MarkComplete, ResponsibleChecklist } from './personal';

const flows = {
  types: [
    ['Regras', 'A equipe escreve condições e o programa as aplica.'],
    ['Aprendizado', 'O ajuste usa exemplos para generalizar.'],
    ['Geração', 'O sistema produz novas amostras a partir de padrões.'],
  ],
  generation: [
    ['Texto', 'O tokenizador converte a sequência em identificadores.'],
    ['Vetores', 'Embeddings e camadas transformam as representações.'],
    ['Próximo token', 'Uma distribuição orienta a escolha e o ciclo se repete.'],
  ],
  prompt: [
    ['Objetivo', 'Declare o resultado esperado.'],
    ['Instrução', 'Combine contexto, tarefa e restrições.'],
    ['Verificação', 'Confira a saída com critérios independentes.'],
  ],
};

function CodeExample({ example }: { example: (typeof codeExamples)[number] }) {
  const parts = example.code.split(
    /("(?:[^"\\]|\\.)*"|\b(?:function|if|throw|new|return|const|def)\b|\b\d+\b)/g,
  );
  return (
    <div className="panel">
      <h3>{example.title}</h3>
      <p>{example.note}</p>
      <div className="code-shell">
        <div className="code-bar">
          <span className="code-language">{example.language}</span>
          <CopyButton value={example.code} label="Copiar código" />
        </div>
        <pre tabIndex={0} aria-label={`Exemplo em ${example.language}`}>
          <code>
            {parts.map((part, index) =>
              index % 2 === 0 ? (
                part
              ) : (
                <span
                  className={part[0] === '"' ? 'syntax-str' : /^\d/.test(part) ? 'syntax-num' : 'syntax-key'}
                  key={index}
                >
                  {part}
                </span>
              ),
            )}
          </code>
        </pre>
      </div>
    </div>
  );
}

export function Lesson({ slug }: { slug: LessonSlug }) {
  const index = lessons.findIndex((item) => item.slug === slug);
  const lesson = lessons[index];
  const article = articles[slug];
  const next = lessons[index + 1];
  const previous = lessons[index - 1];
  const words = [
    article.lead,
    article.practice,
    ...article.sections.flatMap((section) => [...section.paragraphs, section.example ?? '']),
    ...(slug === 'prompts' ? promptExamples.flatMap((example) => [example.vague, example.prompt]) : []),
    ...(slug === 'programacao' ? codeExamples.flatMap((example) => [example.code, example.note]) : []),
  ]
    .join(' ')
    .trim()
    .split(/\s+/).length;
  const extraSection =
    slug === 'prompts'
      ? 'Exemplos para copiar'
      : slug === 'programacao'
        ? 'Exemplos de código'
        : slug === 'uso-responsavel'
          ? 'Checklist de boas práticas'
          : '';
  return (
    <>
      <PageIntro
        title={lesson.title}
        description={article.lead}
        label={`Trilha de aprendizado · Módulo ${index + 1} de ${lessons.length}`}
        extra={
          <p className="page-meta">
            <Clock size={16} aria-hidden="true" /> Cerca de {Math.ceil(words / 150)} min de leitura
          </p>
        }
      />
      <div className="wrap page-body reading-layout">
        <nav className="toc" aria-label="Sumário da lição">
          <h2>Nesta lição</h2>
          <ul>
            {article.sections.map((section) => (
              <li key={section.id}>
                <a href={`#${section.id}`}>{section.title}</a>
              </li>
            ))}
            {extraSection && (
              <li>
                <a href="#aplicacao">{extraSection}</a>
              </li>
            )}
            <li>
              <a href="#pratique">Pratique</a>
            </li>
          </ul>
        </nav>
        <article className="prose">
          {article.sections.map((section) => (
            <section id={section.id} key={section.id}>
              <h2>{section.title}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {section.diagram && (
                <div className="flow">
                  {flows[section.diagram].map(([label, text]) => (
                    <div key={label}>
                      <strong>{label}</strong>
                      <p>{text}</p>
                    </div>
                  ))}
                </div>
              )}
              {section.example && (
                <div className="callout">
                  <strong>Exemplo</strong>
                  <p>{section.example}</p>
                </div>
              )}
              {section.sources && (
                <div className="article-sources">
                  <strong>Para aprofundar</strong>
                  <ul>
                    {section.sources.map((id) => (
                      <li key={id}>
                        <a href={references[id].url}>
                          {references[id].author} · {references[id].title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          ))}
          {extraSection && (
            <section id="aplicacao">
              <h2>{extraSection}</h2>
              {slug === 'prompts' &&
                promptExamples.map((example, index) => (
                  <div className="panel" id={`exemplo-${index + 1}`} key={example.title}>
                    <h3>{example.title}</h3>
                    <p>
                      <strong>Vago</strong> · {example.vague}
                    </p>
                    <p>
                      <strong>Estruturado</strong> · {example.prompt}
                    </p>
                    <div className="actions">
                      <CopyButton value={example.prompt} label="Copiar prompt" />
                    </div>
                  </div>
                ))}
              {slug === 'programacao' &&
                codeExamples.map((example) => <CodeExample key={example.title} example={example} />)}
              {slug === 'uso-responsavel' && <ResponsibleChecklist />}
            </section>
          )}
          <section id="pratique">
            <h2>Pratique</h2>
            <p>{article.practice}</p>
            <Link className="text-link" href={`/laboratorio/#${article.lab}`}>
              {article.labLabel}
            </Link>
          </section>
          <div className="lesson-end">
            <p>O progresso da trilha fica neste navegador.</p>
            <div className="actions">
              <MarkComplete slug={slug} />
              <CopyButton share label="Copiar link da página" />
            </div>
            <nav className="related" aria-label="Outros módulos">
              {previous && (
                <Link className="text-link" href={`/${previous.slug}/`}>
                  Anterior · {previous.short}
                </Link>
              )}
              {next ? (
                <Link className="text-link" href={`/${next.slug}/`}>
                  Próximo · {next.short}
                </Link>
              ) : (
                <Link className="text-link" href="/quiz/">
                  Próximo · Quiz
                </Link>
              )}
              <a className="text-link" href="#conteudo">
                Voltar ao topo
              </a>
            </nav>
          </div>
        </article>
      </div>
    </>
  );
}
